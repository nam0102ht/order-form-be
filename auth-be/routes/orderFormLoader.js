var protoLoader = require('@grpc/proto-loader');
const Products = require('../models/goods_redis/Products');
var productRedis = require("../models/goods_redis/Products");
const ProductService = require('../service/ProductService');
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

let listProduct = (call) => {
    call.on("data", (value) => {
        console.log("value: "+value)
        ProductService.findAll().then(value => {
            console.log(value)
            call.write({
                status: 200,
                message: JSON.stringify(value)
            })
        }).catch(err => {
            console.log(err)
        })
    })
    call.on("end", () => {

    })
    call.on("error", (err) => {
        console.log(err)
    }) 
    call.end()
}

module.exports = {
    packageDefinition: packageDefinition,
    listProduct: listProduct
}