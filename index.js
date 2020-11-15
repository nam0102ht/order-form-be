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
const cors = require('cors')
require("dotenv").config()

const PORT = process.env.SERVER_PORT

// parse application/json
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:3000',}))

userRoutes(app)
groupRoutes(app)
permisisonRoutes(app)
authRoutes(app)

app.listen(PORT, () => {
    logger.info("---------START-PROJECT---------")
    logger.info("Project is running at port"+PORT)
    logger.info("-------------------------------")
})