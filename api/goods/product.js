const ProductService = require("../../service/ProductService")
const utils = require("../../utils/utils")
const backendErr =  require("../../utils/backendError")
const logger = require("../../logger/winston")

exports.createProducts = async (req, res) => {
    let user = utils.tokenFromHeader(req, res)
    if(!user) return
    let body = req.body
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        res.send({...response, status: backendErr.invalidParam})
        logger.info(JSON.stringify(response))
        return
    }
    let name = body.name
    let description = body.description
    let amount = body.amount
    if(!name && !description && !amount) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "Name, Description and Amount must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = await ProductService.insertOne(body)
    if(!type) {
        res.send({
            ...response,
            status: backendErr.systemError,
            message: "Can't insert value"
        })
        logger.info(JSON.stringify(response))
        return
    }
    res.send(response)
    return
}

exports.updateProduct = async (req, res) => {
    let user = utils.tokenFromHeader()
    if(!user) return
    let body = req.body
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        res.send({...response, status: backendErr.invalidParam})
        logger.info(JSON.stringify(response))
        return
    }
    let id = body.id
    let name = body.name
    let description = body.description
    let amount = body.amount
    if(!name && !description && !id && !amount) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "Id, Name, Description, Amount must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = await ProductService.updateType(body)
    if(!type) {
        res.send({
            ...response,
            status: backendErr.systemError,
            message: "Can't update value"
        })
        logger.info(JSON.stringify(response))
        return
    }
    res.send(response)
    return
}

exports.getProducts = async (req, res) => {
    let user = utils.tokenFromHeader(req, res)
    if(!user) return
    let body = req.body
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        res.send({...response, status: backendErr.invalidParam})
        logger.info(JSON.stringify(response))
        return
    }
    let id = body.id
    if(id) {
        let result = await ProductService.findOne(id)
        res.send({...response, data: result})
        logger.info(JSON.stringify(response))
        return
    }
    let types = await ProductService.findAll()
    res.send({...response, data: types})
    logger.info(JSON.stringify(response))
    return
}

exports.getProductByCategory = async (req, res) => {
    let user = utils.tokenFromHeader(req, res)
    if(!user) return
    let body = req.body
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        res.send({...response, status: backendErr.invalidParam})
        logger.info(JSON.stringify(response))
        return
    }
    let id = body.categoryId
    if(!id) {
        res.send({
            ...response, 
            status: backendErr.invalidParam,
            message: "CategoryId must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let types = await ProductService.findProductByCategories(id)
    res.send({...response, data: types})
    logger.info(JSON.stringify(response))
    return
}