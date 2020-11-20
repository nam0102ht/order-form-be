const proLoad = require("@grpc/proto-loader")
var grpc = require('grpc')
var packageDefinition = proLoad.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var routeguide = protoDescriptor.routeguide;

module.exports = {
    routeguide: routeguide
}