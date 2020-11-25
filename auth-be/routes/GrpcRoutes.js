const { redis } = require("googleapis/build/src/apis/redis")
const grpcClient = require("../utils/grpcConnectClient")
const logger = require("../logger/winston")


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



module.exports = {
    ping: ping
}