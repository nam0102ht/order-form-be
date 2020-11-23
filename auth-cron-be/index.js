const express = require('express')
const app = express()
const logger = require('./logger/winston')
const bodyParser = require('body-parser')
const redis = require("./utils/connectRedis")
const orderFormLoader = require("./utils/grpcLoader")
const cors = require('cors')
const grpc = require('@grpc/grpc-js')
require("dotenv").config()


app.use(bodyParser)

const PORT = process.env.SERVER_PORT

var server = new grpc.Server();

app.listen(PORT, () => {
    logger.info("---------START-PROJECT---------")
    logger.info("Project is running at port"+PORT)
    logger.info("-------------------------------")
    
    var orderFormProto = grpc.loadPackageDefinition(orderFormLoader.packageDefinition).orderForm;
    server.addService(orderFormProto.OrderForm.service, {
        order: orderFormLoader.order
    });
    server.bindAsync('0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), () => {
        logger.info("---------START-GRPC---------")
        server.start()
        logger.info("Grpc is running at port "+9090)
        logger.info("-------------------------------")
    });
})