const AuthService = require("../../service/AuthService")
const logger = require("../../logger/winston")
const backendErr = require("../../utils/backendError")
require('dotenv').config()
const utils = require("../../utils/utils")
const GrpcRoutes = require("../../routes/GrpcRoutes")
const { ping } = require("../../utils/connectRedis")
const UserService = require("../../service/UserService")

exports.login = async (req, res) => {
    let body = req.body
    let baseToken = Buffer.from(process.env.TOKEN_GRPC).toString('utf8').toString('base64')
    let response = {
        status: backendErr.success,
        message: "",
        data: {}
    }
    if(!body) {
        logger.info("username and password is null")
        response.status = backendErr.invalidParam
        response.message = "username and password is null"
        return
    }
    let username = body.username
    let password = body.password
    if(!username && !password) {
        logger.info("username and password is not null")
        response.status = backendErr.invalidParam
        response.message = "username and password is null"
        res.send(response)
        return
    }

    let userCheck = await UserService.findByUsername(username) || null
    console.log(userCheck)
    if(!userCheck) {
        logger.info("User is not found")
        response.status = 401
        response.message = "User is not found"
        response.data = {}
        res.send(response)
        return
    }
    if(userCheck.isBlock) {
        logger.info("User is blocked")
        
        let ping = {
            username: username,
            token: baseToken
        }
        GrpcRoutes.getDate(ping, password, res)
        return
    }

    let userLogin = await AuthService.login(username, password)
    if(!userLogin) {
        logger.info("password is'nt match")
        response.status = backendErr.passwordNotCorrect
        response.message = "Password isn't match"
        let ping = {
            username: username,
            token: baseToken
        }
        GrpcRoutes.count(ping)
        res.send(response)
        return
    }

    let ping = {
        username: username,
        token: baseToken
    }

    let token = await utils.generateJwtWithRsa(userLogin)

    return res.send({...response, message: "Success", data: {
        token: token
    }})
}

exports.getProfile =(req, res) => {
    let user = utils.tokenFromHeader(req, res)
    res.send(user)
} 