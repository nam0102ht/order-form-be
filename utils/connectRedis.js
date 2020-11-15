require('dotenv').config()
const redis = require('redis')
const logger = require("../logger/winston")

const PORT = process.env.REDIS_PORT
const HOST = process.env.REDIS_HOST

const client = redis.createClient(PORT, HOST);
var redisAldready = false;
client.on('error', (err) => {
    redisAldready = false;
    logger.info("---------START-REDIS---------")
    logger.info("Redis is not running");
    logger.info("-----------------------------")
    logger.error("Error "+err);
});

client.on('ready', () => {
    redisAldready = true;
    logger.info("---------READY-REDIS---------")
    logger.info("Redis is running")
    logger.info("-----------------------------")
});

module.exports = client