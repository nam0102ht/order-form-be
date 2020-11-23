var protoLoader = require('@grpc/proto-loader');
var productRedis = require("../models/goods_redis/Products");
const { success } = require('../utils/backendError');
const backendError = require('../utils/backendError');
var utils = require("../utils/utils")
var PROTO_PATH = __dirname + '/proto_file/orderForm.proto';
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    objects: true
})


let order = (call, callback) => {
    let order =  call.request
    if(!order) callback(null, {
        status: backendError.notFound,
        message: "Token is null"
    })
    let user = utils.verifyTokenClient(order.token)
    let product = {
        ...order,
        token: null
    }
    let insert = productRedis.insertProductsInRedis(user, product)
    if(!insert) callback(null, {
        status: backendError.invalidParam,
        message: "Redis isn't insert"
    })
    callback(null, {
        status: success,
        message: "Success"
    })
}

module.exports = {
    packageDefinition: packageDefinition,
    order: order
}