const express = require('express')
const app = express()
const logger = require('./logger/winston')
const bodyParser = require('body-parser')
const sequelize = require("./utils/connectDB")
const redis = require("./utils/connectRedis")
const userRoutes = require("./routes/userRoutes")
const groupRoutes = require('./routes/groupRoutes')
const permisisonRoutes = require("./routes/permissionRoutes")
const authRoutes = require("./routes/authRoutes")
const categories = require("./routes/categories")
const products = require("./routes/product")
const type =  require("./routes/types")
const orderFormLoader = require("./routes/orderFormLoader")
const cors = require('cors')
const grpc = require('@grpc/grpc-js')
const grpcClient = require("./routes/GrpcRoutes")
const async = require('async')
const cookieParser = require("cookie-parser")
require("dotenv").config()

const PORT = process.env.SERVER_PORT

// parse application/json
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

userRoutes(app)
groupRoutes(app)
permisisonRoutes(app)
authRoutes(app)
categories(app)
products(app)
type(app)

var server = new grpc.Server();

app.listen(PORT, () => {
    logger.info("---------START-PROJECT---------")
    logger.info("Project is running at port"+PORT)
    logger.info("-------------------------------")
    
    var orderFormProto = grpc.loadPackageDefinition(orderFormLoader.packageDefinition).orderForm;
    server.addService(orderFormProto.OrderForm.service, {
        order: orderFormLoader.order
    });

    grpcClient.ping();

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        logger.info("---------START-GRPC---------")
        server.start()
        logger.info("Grpc is running at port "+50051)
        logger.info("-------------------------------")
    })    
})