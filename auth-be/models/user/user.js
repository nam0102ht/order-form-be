const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: "User"
});

db.sync();

if (db.model.User === User) {
    logger.info("---------INIT-USER---------")
    logger.info("User is init into database")
    logger.info("---------------------------")
}

module.exports = User
