const GroupService = require("../../service/GroupService")
const backendErr = require("../../utils/backendError")
const utils = require("../../utils/utils")

exports.findOne = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let params = req.query
    if(!params) {
        response.status = backendErr.invalidParam
        response.message = "Params userId can't null"
        res.send(response)
        return
    }
    let group = await GroupService.findOne(params.groupId)
    if(!group) {
        response.status = backendErr.groupNotFound
        response.message = "Can't not found user"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: group}
    res.send(response)
} 

exports.insertOne = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }

    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't not null"
        res.send(response)
        return
    }

    let group = await GroupService.insertOne(body)
    if(!group) {
        response.status = backendErr.systemError
        response.message = "Can't not insert"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.updateOne = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }

    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't not null"
        res.send(response)
        return
    }

    let detectGroup = await GroupService.findOne(body.id)
    if(!detectGroup) {
        response.status = backendErr.groupNotFound
        response.message = "Group can't found"
        res.send(response)
        return
    }

    let group = await GroupService.updateOne(body)
    if(!group) {
        response.status = backendErr.systemError
        response.message = "Can't not insert"
        res.send(response)
        return
    }
    response = { ...response, message: "Success", data: {}}
    res.send(response)
}