const Categories = require("../models/goods/Categories")
const Product = require("../models/goods/Product")
const product = require("../models/goods/Product")

module.exports = {
    findOne : async (productId) => {
        return await product.findOne({
            where: {
                id: productId
            }
        })
    },
    findAll : async () => {
        return await product.findAll()
    },
    findAllNotPurchase : async () => {
        return await product.findAll({
            where: {
                isPurechase: false
            }
        })
    },
    findAllLimit : async (limit) => {
        return await product.findAll({
            limit: limit
        })
    },
    findProductByCategories : async (categoryId) => {
        return await Categories.findAll({
            where: {
                id: categoryId
            },
            include: [
                {
                    model: Product,
                    foreignKey: 'categoryId',
                    where: {
                        isPurechase: false
                    }
                }
            ]
        })
    },
    insertOne : async (data) => {
        return await product.create({
            name: data.name,
            description: data.description,
            amount: data.amount,
            image: data.image,
            categoryId: data.categoryId
        })
    },
    pureChase : async (data) => {
        return await product.update({
            isPurechase: true
        }, {
            where: {
                id: data.id
            }
        })
    },
    updateProduct : async (data) => {
        return await product.update({
                name: data.name,
                description: data.description,
                amount: data.amount
            }, {
                where: {
                    id: data.id
                }
        })
    }
}