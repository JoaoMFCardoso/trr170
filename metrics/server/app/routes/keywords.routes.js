module.exports = app => {
    const keyword = require("../controllers/keyword.controller.js");

    var router = require("express").Router();

    // Create a new Keyword
    router.post("/", keyword.create);

    // Retrieve all Keyword
    router.get("/", keyword.findAll);

    // Retrieve a single Keyword with id
    router.get("/:id", keyword.findOne);

    // Update a Keyword with id
    router.put("/:id", keyword.update);

    // Delete a Keyword with id
    router.delete("/:id", keyword.delete);

    // Delete all Keywords
    router.delete("/", keyword.deleteAll);

    app.use('/api/keywords', router);
};