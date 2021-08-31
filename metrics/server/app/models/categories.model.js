module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        category: {
            type: Sequelize.STRING
        },
        n_dataverses: {
            type: Sequelize.INTEGER
        }
    });

    return Categories;
};