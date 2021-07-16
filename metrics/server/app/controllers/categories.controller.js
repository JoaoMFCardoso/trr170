const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Categories
exports.create = (req, res) => {
    // Validate request
    if (!req.body.category) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Categories
    const category = {
        category: req.body.category,
        n_dataverses: req.body.n_dataverses
    };

    // Save Categories in the database
    Categories.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Categories."
            });
        });
};

// Retrieve all Affiliations from the database.
exports.findAll = (req, res) => {
    const category = req.query.category;
    const condition = category ? {category: {[Op.iLike]: `%${category}%`}} : null;

    Categories.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single Categories with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Categories.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Categories with id=" + id
            });
        });
};

// Update a Categories by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Categories.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categories was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Categories with id=" + id
            });
        });
};

// Delete a Categories with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Categories.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categories was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Categories with id=" + id
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Categories.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories."
            });
        });
};