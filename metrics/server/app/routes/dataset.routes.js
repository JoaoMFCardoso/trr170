module.exports = app => {
    const datasets = require("../controllers/dataset.controller.js");

    var router = require("express").Router();

    // Create a new Dataset
    router.post("/", datasets.create);

    // Retrieve all Dataset
    router.get("/", datasets.findAll);

    // Retrieve a single Dataset with id
    router.get("/:id", datasets.findOne);

    // Update a Dataset with id
    router.put("/:id", datasets.update);

    // Delete a Dataset with id
    router.delete("/:id", datasets.delete);

    // Delete all Datasets
    router.delete("/", datasets.deleteAll);

    app.use('/api/datasets', router);
};