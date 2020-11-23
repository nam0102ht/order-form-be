const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")

class Group extends Model {}

Group.init({
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
    modelName: "Group"
});

db.sync()

if (db.model.Group === Group) {
    logger.info("---------INIT-GROUP---------")
    logger.info("Group is init into database")
    logger.info("---------------------------")
}

module.exports = Group
