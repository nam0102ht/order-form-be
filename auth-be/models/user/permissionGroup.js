const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")
const Group = require("./group")
const Permission = require("./permission")

class PermissionGroup extends Model {}

PermissionGroup.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    modelName: "PermissionGroups"
});

Permission.belongsToMany(Group, {
    through: "PermissionGroups",
    as: "Groups",
    foreignKey: "permissionId",
    otherKey: "groupId"
})

Group.belongsToMany(Permission, {
    through: "PermissionGroups",
    as: "Permissions",
    foreignKey: "groupId",
    otherKey: "permissionId"
})

db.sync()

if (db.model.PermissionGroup === PermissionGroup) {
    logger.info("---------INIT-PermissionGroup---------")
    logger.info("PermissionGroup is init into database")
    logger.info("--------------------------------------")
}

module.exports = PermissionGroup
