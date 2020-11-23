const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston");

class Categories extends Model {}

Categories.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: DataTypes.TEXT
}, {
    sequelize: db,
    modelName: "Categorie"
});

db.sync()

if (db.model.Categories === Categories) {
    logger.info("---------INIT-Categories---------")
    logger.info("Categories are init into database")
    logger.info("---------------------------")
}

module.exports = Categories
