const UserService = require("../../service/UserService")
const backendErr = require("../../utils/backendError")
const utils = require("../../utils/utils")

exports.findUserById = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let params = req.query
    if(params) {
        response.status = backendErr.invalidParam
        response.message = "Params userId can't null"
        res.send(response)
        return
    }
    let user = await UserService.findOne(params.userId)
    if(!user) {
        response.message = "Can't not found user"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: user}
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
        response.message = "Body can't be not null"
        res.send(response)
        return
    }

    let username = body.username
    let userId = body.userId
    let userDetect = {};
    if(!userId && !username) {
        response.message = "Properties username and userId is null"
        res.send(response)
        return
    }

    if(!utils.checkValueAndKeyIsNotNull(body, userId)) { 
        userDetect = await UserService.findByUsername(body.username) 
    } else if(!utils.checkValueAndKeyIsNotNull(body, username)) {
        userDetect = await UserService.findOne(userId)
    }

    if(userDetect){
        response.message = "User is exists"
        res.send(response)
        return
    }

    let user = await UserService.insertOne(body)
    if(!user) {
        response.message = "Can't insert database"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.updateUser = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't be not null"
        res.send(response)
        return
    }

    let username = body.username
    let userId = body.userId
    let userDetect = {};
    if(!userId && !username) {
        response.message = "User is exists"
        res.send(response)
        return
    }

    if(!utils.checkValueAndKeyIsNotNull(body, userId)) { 
        userDetect = await UserService.findByUsername(body.username) 
    } else if(!utils.checkValueAndKeyIsNotNull(body, username)) {
        userDetect = await UserService.findOne(userId)
    }

    if(userDetect){
        response.message = "User is exists"
        res.send(response)
        return
    }

    let user = await UserService.insertOne(body)
    if(!user) {
        response.message = "Can't insert database"
        res.send(response)
        return
    }
    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.deleteUser = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't be not null"
        res.send(response)
        return
    }

    let username = body.username
    let userId = body.userId
    let userDetect = {};
    if(!userId && !username) {
        response.status = backendErr.userExist
        response.message = "User is exists"
        res.send(response)
        return
    }

    if(!utils.checkValueAndKeyIsNotNull(body, userId)) { 
        userDetect = await UserService.findByUsername(body.username) 
    } else if(!utils.checkValueAndKeyIsNotNull(body, username)) {
        userDetect = await UserService.findOne(userId)
    }

    if(!userDetect){
        response.status = backendErr.userNotFound
        response.message = "User is not exists"
        res.send(response)
        return
    }
    let deleteUser = {};
    if(!username) deleteUser = UserService.deleteUser(userId)
    else if (!userId) deleteUser = UserService.deleteByUsername(username)

    if(!deleteUser) {
        response.status = backendErr.systemError
        response.message = "Can't delete user"
        res.send(response)
        return
    }

    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.blockUser = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't be not null"
        res.send(response)
        return
    }

    let username = body.username
    let userId = body.userId
    let userDetect = {};
    if(!userId && !username) {
        response.status = backendErr.userExist
        response.message = "User is exists"
        res.send(response)
        return
    }

    if(!utils.checkValueAndKeyIsNotNull(body, userId)) { 
        userDetect = await UserService.findByUsername(body.username) 
    } else if(!utils.checkValueAndKeyIsNotNull(body, username)) {
        userDetect = await UserService.findOne(userId)
    }

    if(!userDetect){
        response.status = backendErr.userNotFound
        response.message = "User is not exists"
        res.send(response)
        return
    }
    let deleteUser = {};
    if(!username) deleteUser = UserService.blockUser(userId)
    else if (!userId) deleteUser = UserService.blockByUsername(username)

    if(!deleteUser) {
        response.status = backendErr.systemError
        response.message = "Can't delete user"
        res.send(response)
        return
    }

    response = {...response, message: "Success", data: {}}
    res.send(response)
}

exports.addToGroup = async (req, res) => {
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    let body = req.body
    if(!body) {
        response.status = backendErr.invalidParam
        response.message = "Body can't be not null"
        res.send(response)
        return
    }
    let groupId = body.groupId
    let userId = body.userId
    let userDetect = {}
    if(!userId && !groupId) {
        response.status = backendErr.invalidParam
        response.message = "UserId and GroupId is not null"
        res.send(response)
        return
    }
    userDetect = UserService.findUserInGroup(userId, groupId)
    if(userDetect) {
        response.status = backendErr.userExistInGroup
        response.message = "User is exists"
        res.send(response)
        return
    }
    let usergroup = UserService.addToGroup(userId, groupId)
    if(!usergroup) {
        response.status = backendErr.systemError
        response.message = "Can't add user to group"
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
        response.message = "Body can't be not null"
        res.send(response)
        return
    }
    let groupId = body.groupId
    let userId = body.userId
    let userDetect = {}
    if(!userId && !groupId) {
        response.status = backendErr.invalidParam
        response.message = "UserId and GroupId is not null"
        res.send(response)
        return
    }
    userDetect = UserService.findUserInGroup(userId, groupId)
    if(userDetect) {
        response.status = backendErr.userExistInGroup
        response.message = "User is exists"
        res.send(response)
        return
    }
    let usergroup = UserService.deleteUserGroup(userId, groupId)
    if(!usergroup) {
        response.status = backendErr.systemError
        response.message = "Can't add user to group"
        res.send(response)
        return
    }

    response = {...response, message: "Success", data: {}}
    res.send(response)
}