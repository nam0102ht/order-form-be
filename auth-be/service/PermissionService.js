const { getRounds } = require("bcrypt")
const Permission = require("../models/user/permission")
const PermissionGroup = require("../models/user/permissionGroup")

module.exports = {
    create: async permission => {
        return await Permission.create({
            name: permission.name,
            description: permission.description
        })
    },
    findOne: async (permissionId) => {
        return await Permission.findOne({
            where: {
                id: permissionId
            }
        })
    },
    findAll: async () => {
        return await Permission.findAll()
    },
    updateOne: async (permission) => {
        return await Permission.update({
            name: permission.name,
            description: permission.description
        },{
            where: {
                id: permission.id
            }
        })
    },
    deleteOne: async (permissionId) => {
        return await Permission.destroy({
            where: {
                id: permissionId
            }
        })
    },
    addPermissionGroup: async (permissionId, groupId) => {
        return await PermissionGroup.create({
            permissionId,
            groupId
        })
    },
    deletePermissionGroup: async (permissionId, groupId) => {
        return await PermissionGroup.destroy({
            where: {
                permissionId: permissionId,
                groupId: groupId
            }
        })
    },
    updatePermissionGroup: async (permissionGroup) => {
        return await PermissionGroup.update({
            permissionId: permissionGroup.permissionId,
            groupId: permissionGroup.groupId
        }, {
            where: {
                id: permissionGroup.id
            }
        })
    },
    findPermisisonGroup: async (permissionId, groupId) => {
        return await PermissionGroup.find({
            where: {
                permissionId: permissionId,
                groupId: groupId
            }
        })
    }
}