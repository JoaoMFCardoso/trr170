const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the metrics API." });
});

require("./app/routes/affiliation.routes")(app);
require("./app/routes/categories.routes")(app);
require("./app/routes/content_type.routes")(app);
require("./app/routes/dataset.routes")(app);
require("./app/routes/dataverse.routes")(app);
require("./app/routes/keywords.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/subjects.routes")(app);
require("./app/routes/topics.routes")(app);
require("./app/routes/totals.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});