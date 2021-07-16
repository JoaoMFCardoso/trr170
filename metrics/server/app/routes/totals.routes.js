module.exports = app => {
    const totals = require("../controllers/totals.controller.js");

    var router = require("express").Router();

    // Create a new Total
    router.post("/", totals.create);

    // Retrieve all Total
    router.get("/", totals.findAll);

    // Retrieve a single Total with id
    router.get("/:id", totals.findOne);

    // Update a Total with id
    router.put("/:id", totals.update);

    // Delete a Total with id
    router.delete("/:id", totals.delete);

    // Delete all Totals
    router.delete("/", totals.deleteAll);

    app.use('/api/totals', router);
};