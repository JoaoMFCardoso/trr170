module.exports = app => {
    const affiliation = require("../controllers/affiliation.controller.js");

    var router = require("express").Router();

    // Create a new Affiliation
    router.post("/", affiliation.create);

    // Retrieve all Affiliation
    router.get("/", affiliation.findAll);

    // Retrieve a single Affiliation with id
    router.get("/:id", affiliation.findOne);

    // Update a Affiliation with id
    router.put("/:id", affiliation.update);

    // Delete a Affiliation with id
    router.delete("/:id", affiliation.delete);

    // Delete all Affiliations
    router.delete("/", affiliation.deleteAll);

    app.use('/api/affiliations', router);
};