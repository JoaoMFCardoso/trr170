const db = require("../models");
const Affiliation = db.affiliation;
const Op = db.Sequelize.Op;

// Create and Save a new Affiliation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.affiliation) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Affiliation
    const affiliation = {
        affiliation: req.body.affiliation,
        n_users: req.body.n_users
    };

    // Save Affiliation in the database
    Affiliation.create(affiliation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Affiliation."
            });
        });
};

// Retrieve all Affiliations from the database.
exports.findAll = (req, res) => {
    const affiliation = req.query.affiliation;
    const condition = affiliation ? {affiliation: {[Op.iLike]: `%${affiliation}%`}} : null;

    Affiliation.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving affiliations."
            });
        });
};

// Find a single Affiliation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Affiliation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Affiliation with id=" + id
            });
        });
};

// Update a Affiliation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Affiliation.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Affiliation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Affiliation with id=${id}. Maybe Affiliation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Affiliation with id=" + id
            });
        });
};

// Delete a Affiliation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Affiliation.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Affiliation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Affiliation with id=${id}. Maybe Affiliation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Affiliation with id=" + id
            });
        });
};

// Delete all Affiliations from the database.
exports.deleteAll = (req, res) => {
    Affiliation.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Affiliations were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all affiliations."
            });
        });
};