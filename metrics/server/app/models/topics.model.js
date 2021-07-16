module.exports = (sequelize, Sequelize) => {
    const Topics = sequelize.define("topics", {
        topic: {
            type: Sequelize.STRING
        },
        n_datasets: {
            type: Sequelize.INTEGER
        }
    });

    return Topics;
};