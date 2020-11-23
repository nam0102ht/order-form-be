const categories = require("../models/goods/Categories")

module.exports = {
    findOne : async (id) => {
        return await categories.findOne({
            where: {
                id: id
            }
        })
    },
    findAll : async () => {
        return await categories.findAll()
    },
    insertOne : async (data) => {
        return await categories.create({
            name: data.name,
            description: data.description
        })
    },
    updateCategories : async (data) => {
        return await categories.update({
                name: data.name,
                description: data.description
            }, {
                where: {
                    id: data.id
                }
        })
    }
}