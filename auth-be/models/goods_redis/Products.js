const clientRedis = require("../../utils/connectRedis")

let insertProductsInRedis = async (user, product) => {
    let userProduct = user.id + "_product"
    let arr = [product]
    let cart = {
        data: JSON.stringify(arr)
    }
    let value_product = clientRedis.HGETALL(userProduct)
    if(!value_product) {
        return await clientRedis.HMSET(
            userProduct,
            JSON.stringify(cart)
        )
    }
    cart = JSON.parse(value_product)
    let data = JSON.parse(cart.data)
    let pro = data.find(value => {
        return value.productId === product.productId
    })
    if(!pro) {
        data.push(product)
    }
    let tmpData = data.filter(value => {
        return value.productId !== pro.productId
    })
    pro = {
        ...pro,
        number: product.number
    }
    tmpData.push(pro)
    return await clientRedis.HMSET(userProduct, JSON.stringify(tmpData))
}

let insertToProducts = async (user) => {
    return await clientRedis.HGETALL(user.id + "_product")
}

let deleteToProducts = async (user, product) => {
    let userProduct = user.id + "_product"
    let arr = [product]
    let cart = {
        data: JSON.stringify(arr)
    }
    let value_product = clientRedis.HGETALL(userProduct)
    if(!value_product) {
        return await clientRedis.HMSET(
            userProduct,
            JSON.stringify(cart)
        )
    }
    cart = JSON.parse(value_product)
    let data = JSON.parse(cart.data)
    let pro = data.find(value => {
        return value.productId === product.productId
    })
    if(!pro) {
        data.push(product)
    }
    let tmpt = []
    if(product.number === 0) {
        tmpt = data.filter(value => value.productId !== pro.productId)
    }
    return await clientRedis.HMSET(userProduct, JSON.stringify(tmpt))
}

let deleteUserProduct = async (user) => {
    return await clientRedis.DEL(user.id + "_product")
}
module.exports = {
    insertProductsInRedis : insertProductsInRedis,
    deleteToProducts,
    deleteUserProduct
}