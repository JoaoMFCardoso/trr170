module.exports = (sequelize, Sequelize) => {
    const Dataverse = sequelize.define("dataverse", {
        dataverse_id: {
            type: Sequelize.STRING
        },
        n_datasets: {
            type: Sequelize.INTEGER
        },
        n_size: {
            type: Sequelize.INTEGER
        }
    });

    return Dataverse;
};