const express = require('express')
const app = express()
const logger = require('./logger/winston')
const bodyParser = require('body-parser')
const redis = require("./utils/connectRedis")
const packageDefinition = require("./utils/configGRPC")
const cors = require('cors')
const grpc = require('@grpc/grpc-js')
const _ = require("lodash")
const { ping } = require('./utils/connectRedis')
require("dotenv").config()


app.use(bodyParser)

const PORT = process.env.SERVER_PORT

var server = new grpc.Server();

app.listen(PORT, () => {
    logger.info("---------START-PROJECT---------")
    logger.info("Project is running at port"+PORT)
    logger.info("-------------------------------")

    let heathCheck = (call, callback) => {
        let baseToken = Buffer.from(process.env.TOKEN_GRPC).toString('utf8').toString('base64')
        let pong = {
            status: 200,
            message: "success",
            token: baseToken
        }
        call.on('data', (ping) => {
            if(Buffer.from(ping.token).toString('utf8')!== process.env.TOKEN_GRPC) {
                logger.info(ping)
                call.write({status: 300, message: "Client call wrong token", token: ''})
                return 
            }
            logger.info('check success')
        })

        setInterval(() => {
            call.write(pong)
        }, 5000*60)
        
        call.on('error', (err) => {
            call.write({status: 400, message: err, token: '' })
            logger.error(err)
            call.end()
        })
    }
    let countCheck = (call, callback) => {
        
    }
    let removeCountCheck = (call) => {}

    server.addService(packageDefinition.AuthCheck.service, {
        heathCheck
    });
    server.bindAsync('0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), () => {
        logger.info("---------START-GRPC---------")
        server.start()
        logger.info("Grpc is running at port "+9090)
        logger.info("-------------------------------")
    });
})