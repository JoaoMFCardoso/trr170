const db = require("../models");
const Roles = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.role) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Role
    const role = {
        role: req.body.role,
        n_users: req.body.n_users
    };

    // Save Role in the database
    Roles.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Role."
            });
        });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const role = req.query.role;
    const condition = role ? {role: {[Op.iLike]: `%${role}%`}} : null;

    Roles.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Roles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + id
            });
        });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Roles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id=" + id
            });
        });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Roles.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role with id=" + id
            });
        });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Roles.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Roles were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Roles."
            });
        });
};