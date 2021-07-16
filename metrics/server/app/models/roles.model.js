module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        role: {
            type: Sequelize.STRING
        },
        n_users: {
            type: Sequelize.INTEGER
        }
    });

    return Roles;
};