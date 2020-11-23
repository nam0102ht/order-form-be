const CategoriesTypeService = require("../../service/CategoriesTypeService")
const utils = require("../../utils/utils")
const backendErr =  require("../../utils/backendError")
const logger = require("../../logger/winston")

exports.createCategoriesType = async (req, res) => {
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
    let categoryId = body.categoryId
    let typeId = body.typeId
    if(!categoryId && !typeId) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "typeId, categoryId must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = await CategoriesTypeService.insertOne(body)
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

exports.updateCategoriesType = async (req, res) => {
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
    let typeId = body.typeId
    let categoryId = body.categoryId
    if(!typeId && !categoryId && !id) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "Id, categoryId, typeId must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = CategoriesTypeService.updateType(body)
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

exports.getCategoryByTypeAll = async (req, res) => {
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
    let typeId = body.typeId
    if(id) {
        let result = await CategoriesTypeService.findOne(id)
        res.send({...response, data: result})
        logger.info(JSON.stringify(response))
        return
    }
    let types = await CategoriesTypeService.findAllByType(typeId)
    res.send({...response, data: types})
    logger.info(JSON.stringify(response))
    return
}

exports.getTypesByCategory = async (req, res) => {
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
            message: "TypeId must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let types = await CategoriesTypeService.findAllByCategory(id)
    res.send({...response, data: types})
    logger.info(JSON.stringify(response))
    return
}