module.exports = (sequelize, Sequelize) => {
    const ContentType = sequelize.define("content_type", {
        content_type: {
            type: Sequelize.STRING
        },
        n_files: {
            type: Sequelize.INTEGER
        }
    });

    return ContentType;
};