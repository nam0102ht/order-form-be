const AuthService = require("../../service/AuthService")
const logger = require("../../logger/winston")
const backendErr = require("../../utils/backendError")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/user")
const UserService = require("../../service/UserService")
require('dotenv').config()
const fs = require("fs")
const utils = require("../../utils/utils")
const { error } = require("../../logger/winston")

exports.login = async (req, res) => {
    let body = req.body
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        logger.info("Body is null")
        response.status = backendErr.invalidParam
        response.message = "Body is null"
        return
    }
    let username = body.username
    let password = body.password
    if(!username && !password) {
        logger.info("username and password is not null")
        response.status = backendErr.invalidParam
        response.message = "Body is null"
        res.send(response)
        return
    }
    let userLogin = await AuthService.login(username, password)
    if(!userLogin) {
        logger.info("password is not null")
        response.status = backendErr.passwordNotCorrect
        response.message = "Password isn't match"
        res.send(response)
        return
    }

    if(userLogin.isBlock) {
        logger.info("password is not null")
        response.status = backendErr.userIsBlock
        response.message = "User is blocked"
        res.send(response)
        return
    }

    let token = await utils.generateJwtWithRsa(userLogin)
    return res.send({...response, message: "Success", data: {
        token: token
    }})
}