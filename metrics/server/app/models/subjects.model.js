module.exports = (sequelize, Sequelize) => {
    const Subjects = sequelize.define("subjects", {
        subject: {
            type: Sequelize.STRING
        },
        n_datasets: {
            type: Sequelize.INTEGER
        }
    });

    return Subjects;
};