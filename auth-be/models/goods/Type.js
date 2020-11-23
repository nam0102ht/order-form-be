const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")

class Type extends Model {}

Type.init({
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
    modelName: "Type"
});

db.sync()

if (db.model.Type === Type) {
    logger.info("---------INIT-Type---------")
    logger.info("Type is init into database")
    logger.info("---------------------------")
}

module.exports = Type
