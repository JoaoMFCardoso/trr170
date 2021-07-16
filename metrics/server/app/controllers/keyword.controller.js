const db = require("../models");
const Keyword = db.keywords;
const Op = db.Sequelize.Op;

// Create and Save a new Keyword
exports.create = (req, res) => {
    // Validate request
    if (!req.body.keyword) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Keyword
    const keyword = {
        keyword: req.body.keyword,
        n_datasets: req.body.n_datasets
    };

    // Save Keyword in the database
    Keyword.create(keyword)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Keyword."
            });
        });
};

// Retrieve all Keywords from the database.
exports.findAll = (req, res) => {
    const keyword = req.query.keyword;
    const condition = keyword ? {keyword: {[Op.iLike]: `%${keyword}%`}} : null;

    Keyword.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving keywords."
            });
        });
};

// Find a single Keyword with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Keyword.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Keyword with id=" + id
            });
        });
};

// Update a Keyword by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Keyword.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Keyword was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Keyword with id=${id}. Maybe Keyword was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Keyword with id=" + id
            });
        });
};

// Delete a Keyword with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Keyword.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Keyword was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Keyword with id=${id}. Maybe Keyword was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Keyword with id=" + id
            });
        });
};

// Delete all Keywords from the database.
exports.deleteAll = (req, res) => {
    Keyword.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Keywords were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Keywords."
            });
        });
};