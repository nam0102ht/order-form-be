const express = require('express')
const app = express()
const logger = require('./logger/winston')
const bodyParser = require('body-parser')
const redis = require("./utils/connectRedis")
const packageDefinition = require("./utils/configGRPC")
const cors = require('cors')
const grpc = require('@grpc/grpc-js')
const _ = require("lodash")
const { ping, del } = require('./utils/connectRedis')
const clientRedis = require("./models/SessionRedis")
const { error } = require('./logger/winston')
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
    let countCheck = async (call, callback) => {
        call.on('data', async (ping) => {
            let baseToken = Buffer.from(process.env.TOKEN_GRPC).toString('utf8').toString('base64')
            if(Buffer.from(ping.token).toString('utf8')!== process.env.TOKEN_GRPC) {
                logger.info(ping)
                call.write({status: 300, message: "Client call wrong token", token: ''})
                return 
            }
            let value = await clientRedis.setCountSessionLogin(ping.username)
            call.write({
                status: 200,
                message: value,
                token: baseToken
            })
        })
        call.on('error', (err) => {
            logger.error(err)
        })
        call.on('end', () => {
            logger.info("End")
        })
    }
    let removeCountCheck = (call) => {
        call.on('data', async (ping) => {
            let baseToken = Buffer.from(process.env.TOKEN_GRPC).toString('utf8').toString('base64')
            if(Buffer.from(ping.token).toString('utf8')!== process.env.TOKEN_GRPC) {
                logger.info(ping)
                call.write({status: 300, message: "Client call wrong token", token: ''})
                return 
            }
            let value = await clientRedis.removeUserLoginFaild(ping.username)
            call.write({
                status: 200,
                message: value,
                token: baseToken
            })
        })
        call.on('error', (err) => {
            logger.error(err)
        })
        call.on('end', () => {
            logger.info("End")
        })
    }

    let dateExpire = (timeEnd) => {
        let delta = timeEnd - new Date().getTime()
        let seconds = (delta / 1000).toFixed(1)
        let minutes = Math.floor(seconds / 60)
        let hours = '';
        if(minutes >= 60) {
            let hour = Math.floor(minutes / 60)
            hours = hour >= 10 ? hour : '0'+hour
        }
        let mm = minutes - (hours*60);
        let minut = mm >= 10 ? mm : '0'+mm
        let ss = Math.floor(seconds % 60)
        let sec = ss >= 10 ? ss : '0'+ss
        if( hours === '') {
            return minut +":"+ sec
        }
        return hours + ":" +minut +":"+ sec
    }

    let dateBlock = (call, callback) => {
        call.on('data', async (ping) => {
            let baseToken = Buffer.from(process.env.TOKEN_GRPC).toString('utf8').toString('base64')
            if(Buffer.from(ping.token).toString('utf8')!== process.env.TOKEN_GRPC) {
                logger.info(ping)
                call.write({status: 300, message: "Client call wrong token", token: ''})
                return 
            }
            let value = await clientRedis.getDateSessionBlock(ping.username)
            let obj = JSON.parse(value)
            let delta = obj.timeEnd - (new Date().getTime())
            if(delta > 0) {
                call.write({
                    status: 200,
                    message: `User is block with in ${dateExpire(obj.timeEnd)}`,
                    token: baseToken
                })
            } else {
                call.write({
                    status: 200,
                    message: `remove`,
                    token: baseToken
                })
            }
        })
        call.on('error', (err) => {
            logger.error(err)
        })
        call.on('end', () => {
            logger.info("End")
        })
    }


    server.addService(packageDefinition.AuthCheck.service, {
        heathCheck,
        countCheck,
        dateBlock,
        removeCountCheck
    });
    server.bindAsync('0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), () => {
        logger.info("---------START-GRPC---------")
        server.start()
        logger.info("Grpc is running at port "+9090)
        logger.info("-------------------------------")
    });
})