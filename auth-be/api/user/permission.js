const { deletePermissionGroup } = require("../../service/PermissionService")
const PermissionService = require("../../service/PermissionService")
const { groupExist } = require("../../utils/backendError")
const backendErr = require("../../utils/backendError")


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
    let permission = await PermissionService.findOne(params.permissionId)
    if(!permission) {
        response.status = backendErr.permissionNotFound
        response.message = "Can't not found user"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: permission}
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

    let permission = await PermissionService.create(body)
    if(!permission) {
        response.status = backendErr.systemError
        response.message = "Can't not insert"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.findAll = async (req, res) => {
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
    let permission = await PermissionService.findAll()
    if(!permission) {
        response.status = backendErr.permissionNotFound
        response.message = "Can't not found user"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: permission}
    res.send(response)
}

exports.delete = async (req, res) => {
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

    let permission = await PermissionService.deleteOne(body.id)
    if(!permission) {
        response.status = backendErr.systemError
        response.message = "Can't not delete"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.addUserToGroup = async (req, res) => {
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

    let permissionId = body.permissionId
    let groupId = body.groupId
    if(!permissionId && !groupId) {
        response.status = backendErr.invalidParam
        response.message = "permissionId and groupId can't not null"
        res.send(response)
        return
    }

    let detectPermissionGroup = PermissionService.findPermisisonGroup(permissionId, groupId)
    if(deletePermissionGroup) {
        response.status = backendErr.permissionExist
        response.message = "Permission is added in group"
        res.send(response)
        return
    }

    let permission = await PermissionService.addPermissionGroup(body)
    if(!permission) {
        response.status = backendErr.systemError
        response.message = "Can't not add in group"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.deleteUserInGroup = async (req, res) => {
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

    let permissionId = body.permissionId
    let groupId = body.groupId
    if(!permissionId && !groupId) {
        response.status = backendErr.invalidParam
        response.message = "permissionId and groupId can't not null"
        res.send(response)
        return
    }

    let detectPermissionGroup = PermissionService.findPermisisonGroup(permissionId, groupId)
    if(!detectPermissionGroup) {
        response.status = backendErr.permissionNotFound
        response.message = "Permission is not found"
        res.send(response)
        return
    }

    let permission = await PermissionService.deletePermissionGroup(body.id)
    if(!permission) {
        response.status = backendErr.systemError
        response.message = "Can't not delete"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.updatePermissionGroup = async (req, res) => {
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

    let permissionId = body.permissionId
    let groupId = body.groupId
    if(!permissionId && !groupId) {
        response.status = backendErr.invalidParam
        response.message = "permissionId and groupId can't not null"
        res.send(response)
        return
    }

    let detectPermissionGroup = PermissionService.findPermisisonGroup(permissionId, groupId)
    if(!detectPermissionGroup) {
        response.status = backendErr.permissionNotFound
        response.message = "Permission of group is not found"
        res.send(response)
        return
    }

    let permission = await PermissionService.updatePermissionGroup(body)
    if(!permission) {
        response.status = backendErr.systemError
        response.message = "Can't not delete"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}