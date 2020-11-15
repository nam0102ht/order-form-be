require('dotenv').config();
const logger = require('../logger/winston')
const { Sequelize } = require('sequelize');
const winston = require('../logger/winston');

const USERNAME= process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD
const DATABASE=process.env.DB_DATABASE
const HOST=process.env.DB_HOST


const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: winston.info.bind(winston)
});

sequelize.authenticate().then(() => {
    logger.info("---------DATABASE-START---------")
    logger.info("Connection has been established successfully")
    logger.info("----------DATABASE-END----------")
}).catch(err => {
    logger.error('Unable to connect to the database:', err);
});

module.exports = sequelize
