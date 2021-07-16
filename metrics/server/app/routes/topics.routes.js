module.exports = app => {
    const topic = require("../controllers/topics.controller.js");

    var router = require("express").Router();

    // Create a new Topic
    router.post("/", topic.create);

    // Retrieve all Topic
    router.get("/", topic.findAll);

    // Retrieve a single Topic with id
    router.get("/:id", topic.findOne);

    // Update a Topic with id
    router.put("/:id", topic.update);

    // Delete a Topic with id
    router.delete("/:id", topic.delete);

    // Delete all Topics
    router.delete("/", topic.deleteAll);

    app.use('/api/topics', router);
};