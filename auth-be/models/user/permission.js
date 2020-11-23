const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")

class Permission extends Model {}

Permission.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize: db,
    modelName: "Permission"
});

db.sync()

if (db.model.Permission === Permission) {
    logger.info("---------INIT-PERMISSION---------")
    logger.info("Permission is init into database")
    logger.info("---------------------------")
}

module.exports = Permission
