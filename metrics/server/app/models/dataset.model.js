module.exports = (sequelize, Sequelize) => {
    const Dataset = sequelize.define("dataset", {
        dataset_id: {
            type: Sequelize.STRING
        },
        n_filecount: {
            type: Sequelize.INTEGER
        },
        n_size: {
            type: Sequelize.INTEGER
        },
        n_versions: {
            type: Sequelize.INTEGER
        },
        n_draft_versions: {
            type: Sequelize.INTEGER
        },
        n_views: {
            type: Sequelize.INTEGER
        },
        n_unique_views: {
            type: Sequelize.INTEGER
        },
        n_downloads: {
            type: Sequelize.INTEGER
        },
        n_unique_downloads: {
            type: Sequelize.INTEGER
        },
        n_citations: {
            type: Sequelize.INTEGER
        }
    });

    return Dataset;
};