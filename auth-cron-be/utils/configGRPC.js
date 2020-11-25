const proLoad = require("@grpc/proto-loader")
var grpc = require('grpc')

const PROTO_PATH = __dirname + "/proto_file/authCheck.proto"

console.log(PROTO_PATH)

const load = proLoad.loadSync(PROTO_PATH)

var packageDefinition = grpc.loadPackageDefinition(load).AuthCheck

module.exports = packageDefinition