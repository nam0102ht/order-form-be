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
    return new Promise((resolve, rejects) => {
        jwt.verify(token, PUBLIC_KEY, {algorithms: ['RS256']}, (err, result) => {
            if(err) rejects(err)
            resolve(result)
        })
    })
}

module.exports = {
    hashPasswordBcrypt: hashPasswordBcrypt,
    checkPasswordBcrypt: checkPasswordBcrypt,
    checkValueAndKeyIsNotNull: checkValueAndKeyIsNotNull,
    generateJwtWithRsa: generateJwtWithRsa,
    verifyToken: verifyToken,
    generateJwtWithRsaClient: generateJwtWithRsaClient,
    verifyTokenClient: verifyTokenClient
}