module.exports = app => {
    const dataverse = require("../controllers/dataverse.controller.js");

    var router = require("express").Router();

    // Create a new Dataverse
    router.post("/", dataverse.create);

    // Retrieve all Dataverse
    router.get("/", dataverse.findAll);

    // Retrieve a single Dataverse with id
    router.get("/:id", dataverse.findOne);

    // Update a Dataverse with id
    router.put("/:id", dataverse.update);

    // Delete a Dataverse with id
    router.delete("/:id", dataverse.delete);

    // Delete all Dataverses
    router.delete("/", dataverse.deleteAll);

    app.use('/api/dataverses', router);
};