module.exports = (sequelize, Sequelize) => {
    const Keywords = sequelize.define("keywords", {
        keyword: {
            type: Sequelize.STRING
        },
        n_datasets: {
            type: Sequelize.INTEGER
        }
    });

    return Keywords;
};