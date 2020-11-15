const Groups = require("../models/user/group")

module.exports = {
    findOne: async (groupId) => {
        let group = await Groups.findOne({
            where: { 
                id: groupId
            }
        })
        return group ? {
            id: group.id,
            name: group.name,
            description: group.description
        } : {}
    },
    findAll: async () => {
        let groups = await Groups.findAll()
        return groups ? groups : []
    },
    insertOne: async (group) => {
        return await Groups.create({
            name: group.name,
            description: group.description
        })
    },
    updateOne: async (group) => {
        return await Groups.update({
            name: group.name,
            description: group.description
        }, {
            where: {
                id: group.id
            }
        })
    },
    deleteGroup: async (groupId) => {
        return await Groups.destroy({
            where: {
                id: groupId
            }
        })
    }
}