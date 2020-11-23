const Categories = require("../models/goods/Categories")
const categoriesType = require("../models/goods/CategoriesType")
const Type = require("../models/goods/Type")

module.exports = {
    findOne : async (id) => {
        return await categoriesType.findOne({where: {id: id}})
    },
    findAllByType: async (typeId) => {
        return await Type.findAll({
            where : {
                id: typeId
            },
            include: [
                {
                    model: Categories,
                    as: "Categories",
                    through: "CategoriesType"
                }
            ]
        })
    },
    findAllByCategory: async (categoryId) => {
        return await Categories.findAll({ 
            where: { 
                id: categoryId
            },
            include: [
                {
                    model: Type,
                    as: "Types",
                    through: "CategoriesType"
                }
            ]
        })
    },
    insertOne: async (data) => {
        return await categoriesType.create({
            typeId: data.typeId,
            categoryId: data.categoryId
        })
    },
    updateOne: async (data) => {
        return await categoriesType.create({
            typeId: data.typeId,
            categoryId: data.categoryId
        }, {
            where: {
                id: data.id
            }
        })
    }
}