module.exports = app => {
    const subject = require("../controllers/subjects.controller.js");

    var router = require("express").Router();

    // Create a new Subject
    router.post("/", subject.create);

    // Retrieve all Subject
    router.get("/", subject.findAll);

    // Retrieve a single Subject with id
    router.get("/:id", subject.findOne);

    // Update a Subject with id
    router.put("/:id", subject.update);

    // Delete a Subject with id
    router.delete("/:id", subject.delete);

    // Delete all Subjects
    router.delete("/", subject.deleteAll);

    app.use('/api/subjects', router);
};