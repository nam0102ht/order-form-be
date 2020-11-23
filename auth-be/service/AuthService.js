const User = require("../models/user/user")
const UserService = require("./UserService")
const logger =require("../logger/winston")
const utils = require("../utils/utils")

module.exports = {
    login: async (username, password) => {
        let userHasPass = await (await UserService.findHasPass(username))
        if(!userHasPass) {
            logger.info("Can't find by username: "+ username)
            return null
        }
        if(!utils.checkPasswordBcrypt(userHasPass.password, password)) {
            logger.info("Password input is incorrect: "+ username)
            return null
        }
        return userHasPass
    }
}