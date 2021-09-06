module.exports = {
    HOST: "localhost",
    PORT: "1234",
    USER: "fancy_user",
    PASSWORD: "fancy_password",
    DB: "metrics",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};