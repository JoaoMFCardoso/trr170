const db = require("../models");
const ContentType = db.content_type;
const Op = db.Sequelize.Op;

// Create and Save a new Content Type
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content_type) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Content Type
    const content_type = {
        content_type: req.body.content_type,
        n_files: req.body.n_files
    };

    // Save ContentType in the database
    ContentType.create(content_type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Content Type."
            });
        });
};

// Retrieve all Content Types from the database.
exports.findAll = (req, res) => {
    const contentType = req.query.content_type;
    const condition = contentType ? {content_type: {[Op.iLike]: `%${contentType}%`}} : null;

    ContentType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving content types."
            });
        });
};

// Find a single Content Type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ContentType.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Content Type with id=" + id
            });
        });
};

// Update a Content Type by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ContentType.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Content Type was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Content Type with id=${id}. Maybe Content Type was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Content Type with id=" + id
            });
        });
};

// Delete a Content Type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ContentType.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Content Type was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Content Type with id=${id}. Maybe Content Type was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Content Type with id=" + id
            });
        });
};

// Delete all Content Types from the database.
exports.deleteAll = (req, res) => {
    ContentType.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Content Types were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Content Types."
            });
        });
};