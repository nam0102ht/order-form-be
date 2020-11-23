const User = require("../models/user/user")
const UserGroup = require("../models/user/userGroup")
const utils = require("../utils/utils")
module.exports = {
    findOne: async (userId) => {
        let user = await User.findOne({where: { id: userId}});
        return user ? {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isDelete: user.isDelete,
            isBlock: user.isBlock
        } : null
    },
    findHasPass: async (username) => {
        return await User.findOne({
            where: {
                username: username
            }
        })
    },
    findByUsername: async (username) => {
        let user = await User.findOne({where: { username: username }})
        return user ? {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isDelete: user.isDelete,
            isBlock: user.isBlock
        } : null
    },
    insertOne: async user => {
        let userInsert = await User.create({
            username: user.username,
            password: utils.hashPasswordBcrypt(user.password),
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            isDelete: false,
            isBlock: false
        })
        return {
            id: userInsert.id,
            username: userInsert.username,
            firstName: userInsert.firstName,
            lastName: userInsert.lastName,
            phoneNumber: userInsert.phoneNumber,
            email: userInsert.email
        }
    },
    updateByUserId: async userId => {
        return await User.update({
            password: utils.hashPasswordBcrypt(user.password),
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email
        }, {
            where: {
                id: userId
            }
        })
    },
    updateByUsername: async userId => {
        return await User.update({
            password: utils.hashPasswordBcrypt(user.password),
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email
        }, {
            where: {
                username: username
            }
        })
    },
    updateByUserName: async username => {
        return await User.update({
            password: utils.hashPasswordBcrypt(user.password),
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email
        }, {
            where: {
                username: username
            }
        })
    },
    deleteUser: async userId => {
        return await User.update({
            isDelete: true
        }, {
            where : {
                userId: userId
            }
        })
    },
    deleteByUsername: async username => {
        return await User.update({
            isDelete: true
        }, {
            where : {
                username: username
            }
        })
    },
    blockUser: async userId => {
        return await User.update({
            isBlock: true
        }, {
            where: {
                userId: userId
            }
        })
    },
    blockByUsername: async username => {
        return await User.update({
            isBlock: true
        }, {
            where: {
                username: username
            }
        })
    },
    addToGroup: async (userId, groupId) => {
        return await UserGroup.create({
            userId: userId,
            groupId: groupId
        })
    },
    deleteUserGroup: async (userId, groupId) => {
        return await UserGroup.destroy({
            groupId: groupId
        }, {
            where: {
                userId: userId
            }
        })
    },
    findUsersToGroup: async (groupId) => {
        return await UserGroup.findAll({
            where: {
                groupId: groupId
            }
        })
    },
    findGroupsUser: async (userId) => {
        return await UserGroup.findAll({
            where: {
                userId: userId
            }
        })
    },
    findUserInGroup: async (userId, groupId) => {
        return await UserGroup.findAll({
            where: {
                userId: userId,
                groupId: groupId
            }
        })
    }
}