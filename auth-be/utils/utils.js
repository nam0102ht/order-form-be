const { rejects } = require('assert');
const bcrypt = require('bcrypt')
const fs = require("fs")
const jwt = require("jsonwebtoken");
const { resolve } = require('path');
const SALT = 10;
const PRIVATE_KEY = fs.readFileSync("./static/privateKey.pem", { encoding: 'utf-8'})
const PRIVATE_KEY_CLIENT = fs.readFileSync("./static/privateKeyClient.pem", { encoding: 'utf-8'})
const PUBLIC_KEY = fs.readFileSync("./static/publicKey.pem", {encoding: 'utf-8'})
const PUBLIC_KEY_CLIENT = fs.readFileSync("./static/publicKeyClient.pem", { encoding: 'utf-8'})
const errorBackend = require("./backendError");
const { keys } = require('./connectRedis');

let hashPasswordBcrypt = (password) => {
    const saltSync = bcrypt.genSaltSync(SALT)
    const hashSync = bcrypt.hashSync(password, saltSync)
    return hashSync
}

let checkPasswordBcrypt = (passwordHash, passwordIsChecked) => {
    return bcrypt.compareSync(passwordIsChecked, passwordHash)
}

let checkValueAndKeyIsNotNull = (obj, key) => {
    if(!obj[key] && !obj.hasOwnProperty(key)) return false
    return true
}

let generateJwtWithRsa = async (user) => {
    let token = await jwt.sign(
        {
            userId: user.id,
            username: user.username,
            email: user.email,
            fullName: user.firstName + " "+ user.lastName,
            lastName: user.lastName,
            firstName: user.firstName,
            phoneNumber: user.phoneNumber,
            isDelete: user.isDelete,
            isBlock: user.isBlock
        }, 
        PRIVATE_KEY,
        {
            expiresIn: '7d',
            subject: 'userInfo',
            algorithm: 'RS256'
        }
    )
    return token
}

let verifyToken = async (token) => {
    return jwt.verify(token, PUBLIC_KEY_CLIENT, {algorithms: ['RS256']})
}

let tokenFromHeader = async (req, res) => {
    let headers = req.headers
    if(!headers) {
        res.send({
            status: errorBackend.invalidParam,
            message: "Headers is null",
            data: {}
        })
        return ""
    }
    let token = headers.authorization
    if(!token) {
        res.send({
            status: errorBackend.invalidParam,
            message: "Token must have",
            data: {}
        })
        return ""
    }
    let tokenBearer = token.split("Bearer ")
    if(tokenBearer.length === 0) {
        res.send({
            status: errorBackend.invalidParam,
            message: "Token is bad format",
            data: {}
        })
        return ""
    }
    let jwtToken = tokenBearer[1]
    let jsonRes = await verifyTokenClient(jwtToken)
    if(!jsonRes) {
        res.send({
            status: errorBackend.invalidParam,
            message: "Token is bad format"
        })
        return ""
    }
    return jsonRes
}

let generateJwtWithRsaClient = async (user) => {
    let token = await jwt.sign(
        {
            userId: user.id,
            username: user.username,
            email: user.email,
            fullName: user.firstName + " "+ user.lastName,
            lastName: user.lastName,
            firstName: user.firstName,
            phoneNumber: user.phoneNumber,
            isDelete: user.isDelete,
            isBlock: user.isBlock
        }, 
        PRIVATE_KEY_CLIENT,
        {
            expiresIn: '7d',
            subject: 'userInfo',
            algorithm: 'RS256'
        }
    )
    return token
}

let verifyTokenClient = async (token) => {
    return await jwt.verify(token, PUBLIC_KEY_CLIENT)
}

module.exports = {
    hashPasswordBcrypt: hashPasswordBcrypt,
    checkPasswordBcrypt: checkPasswordBcrypt,
    checkValueAndKeyIsNotNull: checkValueAndKeyIsNotNull,
    generateJwtWithRsa: generateJwtWithRsa,
    verifyToken: verifyToken,
    generateJwtWithRsaClient: generateJwtWithRsaClient,
    verifyTokenClient: verifyTokenClient,
    tokenFromHeader: tokenFromHeader
}