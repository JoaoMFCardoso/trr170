module.exports = (sequelize, Sequelize) => {
    const Totals = sequelize.define("totals", {
        n_dataverses: {
            type: Sequelize.INTEGER
        },
        n_datasets: {
            type: Sequelize.INTEGER
        },
        n_files: {
            type: Sequelize.INTEGER
        },
        n_users: {
            type: Sequelize.INTEGER
        }
    });

    return Totals;
};