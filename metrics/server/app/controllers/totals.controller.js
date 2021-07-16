const db = require("../models");
const Totals = db.totals;
const Op = db.Sequelize.Op;

// Create and Save a new Totals
exports.create = (req, res) => {
    // Validate request
    if (!req.body.n_dataverses) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Topic
    const total = {
        n_dataverses: req.body.n_dataverses,
        n_datasets: req.body.n_datasets,
        n_files: req.body.n_files,
        n_users: req.body.n_users
    };

    // Save Totals in the database
    Totals.create(total)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Total."
            });
        });
};

// Retrieve all Totals from the database.
exports.findAll = (req, res) => {
    const n_dataverses = req.query.n_dataverses;
    const condition = n_dataverses ? {n_dataverses: {[Op.iLike]: `%${n_dataverses}%`}} : null;

    Totals.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Totals."
            });
        });
};

// Find a single Total with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Totals.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Total with id=" + id
            });
        });
};

// Update a Total by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Totals.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Total was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Total with id=${id}. Maybe Total was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Total with id=" + id
            });
        });
};

// Delete a Total with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Totals.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Total was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Total with id=${id}. Maybe Total was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Total with id=" + id
            });
        });
};

// Delete all Totals from the database.
exports.deleteAll = (req, res) => {
    Totals.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Totals were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Totals."
            });
        });
};