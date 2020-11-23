const type = require("../models/goods/Type")

module.exports = {
    findOne : async (id) => {
        return await type.findOne({
            where: {
                id: id
            }
        })
    },
    findAll : async () => {
        return await type.findAll()
    },
    insertOne : async (data) => {
        return await type.create({
            name: data.name,
            description: data.description
        })
    },
    updateType : async (data) => {
        return await type.update({
                name: data.name,
                description: data.description
            }, {
                where: {
                    id: data.id
                }
        })
    }
}