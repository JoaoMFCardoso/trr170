const dbConfig = require("../controllers/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.affiliation = require("./affiliation.model.js")(sequelize, Sequelize);
db.categories = require("./categories.model.js")(sequelize, Sequelize);
db.content_type = require("./content_type.model.js")(sequelize, Sequelize);
db.dataset = require("./dataset.model.js")(sequelize, Sequelize);
db.dataverse = require("./dataverse.model.js")(sequelize, Sequelize);
db.keywords = require("./keywords.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.subjects = require("./subjects.model.js")(sequelize, Sequelize);
db.topics = require("./topics.model.js")(sequelize, Sequelize);
db.totals = require("./totals.model.js")(sequelize, Sequelize);

module.exports = db;