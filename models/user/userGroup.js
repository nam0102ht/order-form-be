const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")
const Group = require("./group")
const User = require("./user")

class UserGroup extends Model {}

UserGroup.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    modelName: "UserGroup"
});

User.belongsToMany(Group, {
    through: "UserGroups",
    as: "Groups",
    foreignKey: "userId",
    otherKey: "groupId"
})

Group.belongsToMany(User, {
    through: "UserGroups",
    as: "Users",
    foreignKey: "groupId",
    otherKey: "userId"
})

db.sync()

if (db.model.UserGroup === UserGroup) {
    logger.info("---------INIT-UserGroup---------")
    logger.info("UserGroup is init into database")
    logger.info("--------------------------------")
}

module.exports = UserGroup
