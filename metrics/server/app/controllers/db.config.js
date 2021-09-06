module.exports = {
    HOST: "localhost",
    PORT: '8081',
    USER: "dv_harvester",
    PASSWORD: "2021.harvester",
    DB: "metrics",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};