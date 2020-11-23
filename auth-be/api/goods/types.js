const TypeService = require("../../service/TypeService")
const utils = require("../../utils/utils")
const backendErr =  require("../../utils/backendError")
const logger =  require("../../logger/winston")
exports.createType = async (req, res) => {
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
    if(!name && !description) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "Name and Description must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = await TypeService.insertOne(body)
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

exports.updateType = async (req, res) => {
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
    let name = body.name
    let description = body.description
    if(!name && !description && !id) {
        res.send({
            ...response,
            status: backendErr.invalidParam,
            message: "Name and Description must have"
        })
        logger.info(JSON.stringify(response))
        return
    }
    let type = await TypeService.updateType(body)
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
    logger.info(JSON.stringify(response))
    return
}

exports.getType = async (req, res) => {
    let user = await utils.tokenFromHeader(req, res)
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
        let result = await TypeService.findOne(id)
        res.send({...response, data: result})
        logger.info(JSON.stringify(response))
        return
    }
    let types = await TypeService.findAll()
    res.send({...response, data: types})
    logger.info(JSON.stringify(response))
    return
}