const db = require("../models");
const Dataverse = db.dataverse;
const Op = db.Sequelize.Op;

// Create and Save a new Dataverse
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dataverse_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Dataverse
    const dataverse = {
        dataverse_id: req.body.dataverse_id,
        n_datasets: req.body.n_datasets,
        n_size: req.body.n_size
    };

    // Save Dataverse in the database
    Dataverse.create(dataverse)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Dataverse."
            });
        });
};

// Retrieve all Affiliations from the database.
exports.findAll = (req, res) => {
    const dataverse_id = req.query.dataverse_id;
    const condition = dataverse_id ? {dataverse_id: {[Op.iLike]: `%${dataverse_id}%`}} : null;

    Dataverse.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dataverses."
            });
        });
};

// Find a single Dataverse with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Dataverse.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dataverse with id=" + id
            });
        });
};

// Update a Dataverse by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Dataverse.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dataverse was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Dataverse with id=${id}. Maybe Dataverse was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Dataverse with id=" + id
            });
        });
};

// Delete a Dataverse with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Dataverse.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dataverse was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Dataverse with id=${id}. Maybe Dataverse was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Dataverse with id=" + id
            });
        });
};

// Delete all Dataverses from the database.
exports.deleteAll = (req, res) => {
    Dataverse.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Dataverses were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Dataverses."
            });
        });
};