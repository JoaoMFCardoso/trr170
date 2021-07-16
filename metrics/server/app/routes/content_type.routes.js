module.exports = app => {
    const content_types = require("../controllers/content_type.controller.js");

    var router = require("express").Router();

    // Create a new Content Type
    router.post("/", content_types.create);

    // Retrieve all Content Type
    router.get("/", content_types.findAll);

    // Retrieve a single Content Type with id
    router.get("/:id", content_types.findOne);

    // Update a Content Type with id
    router.put("/:id", content_types.update);

    // Delete a Content Type with id
    router.delete("/:id", content_types.delete);

    // Delete all Content Type
    router.delete("/", content_types.deleteAll);

    app.use('/api/content_types', router);
};