module.exports = (sequelize, Sequelize) => {
    const Affiliation = sequelize.define("affiliation", {
        affiliation: {
            type: Sequelize.STRING
        },
        n_users: {
            type: Sequelize.INTEGER
        }
    });

    return Affiliation;
};