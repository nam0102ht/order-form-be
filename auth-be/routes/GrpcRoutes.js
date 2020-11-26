const { redis } = require("googleapis/build/src/apis/redis")
const grpcClient = require("../utils/grpcConnectClient")
const logger = require("../logger/winston")
const userService = require("../service/UserService")
const backendErr = require("../utils/backendError")
const { write } = require("../logger/winston")
const UserService = require("../service/UserService")
const AuthService = require("../service/AuthService")
const utils = require("../utils/utils")

let ping = () => {
    let call =  grpcClient.heathCheck()

    let token = process.env.TOKEN_GRPC

    let pings = {
        status: 200,
        message: "Success",
        token: Buffer.from(token).toString('utf8').toString('base64')
    }
    
    call.on('data', (pong) => {
        if(Buffer.from(pong.token).toString('utf8')!== process.env.TOKEN_GRPC) {
            logger.info(pong)
            call.write({status: 300, message: "Client call wrong token", token: ''})
        }
    })
    setInterval(() => {
        call.write(pings)
    }, 5000*60)
    call.on('error', (err) => {
        logger.error(err)
        call.end()
    })
}

let count = (ping) => {
    let call = grpcClient.countCheck()
    call.write(ping)
    call.on('data', pong => {
        if(Buffer.from(pong.token).toString('utf8')!== process.env.TOKEN_GRPC) {
            logger.info(pong)
            call.write({status: 300, message: "Client call wrong token", token: ''})
            return 
        }
        if(pong.message === 'block') userService.blockByUsername(ping.username)
        logger.info(JSON.stringify(pong))
    })
    call.on('error', (err) => {
        logger.error(err)
    })
    call.on('end', () => {
        logger.info("End")
    })
    call.end()
}

let getDate = (ping, password, res) => {
    let call = grpcClient.dateBlock()
    call.write(ping)
    call.on('data', async pong => {
        if(Buffer.from(pong.token).toString('utf8')!== process.env.TOKEN_GRPC) {
            logger.info(pong)
            call.write({status: 300, message: "Client call wrong token", token: ''})
        }
        if(pong.message === 'remove'){
            let user = await UserService.unblockByUsername(ping.username)
            if(user[0] === 1) {
                let userLogin = await AuthService.login(ping.username, password)
                if(!userLogin) {
                    logger.info("password is'nt match")
                    response.status = backendErr.passwordNotCorrect
                    response.message = "Password isn't match"
                    GrpcRoutes.count(ping)
                    res.send(response)
                    return
                }
                GrpcRoutes.remove(ping, res)
                let token = await utils.generateJwtWithRsa(userLogin)
                return res.send({...response, message: "Success", data: {
                    token: token
                }})
            }
            return
        }
        let response  = {}
        response.status = backendErr.userIsBlock
        response.message = pong.message
        res.send(response)
    })
    call.on('error', (err) => {
        logger.error(err)
    })
    call.on('end', () => {
        logger.info("End")
    })
}

let remove = (ping, res) => {
    let call = grpcClient.removeCountCheck()
    
    write(ping)

    call.on('data', (pong) => {
        if(Buffer.from(pong.token).toString('utf8')!== process.env.TOKEN_GRPC) {
            logger.info(pong)
            call.write({status: 300, message: "Client call wrong token", token: ''})
            res.send(pong)
        }
        let response  = {}
        response.status = backendErr.success
        response.message = pong.message
        res.send(response)
        logger.info(JSON.stringify(pong))
    })

    call.on('err', (err) => {
        logger.error(err)
    })

    call.on('end' , () => {})
}

module.exports = {
    ping: ping,
    count: count,
    getDate: getDate,
    remove: remove
}