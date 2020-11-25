const PROTO_PATH = __dirname + '/grpc_proto/authCheck.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const authCheckRoute = grpc.loadPackageDefinition(packageDefinition).AuthCheck;

const client = new authCheckRoute.AuthCheck('0.0.0.0:9090',
                                       grpc.credentials.createInsecure());

module.exports = client