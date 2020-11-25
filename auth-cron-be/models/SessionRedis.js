const { cli } = require("winston/lib/winston/config")
const clientRedis = require("../utils/connectRedis")
const logger = require("../logger/winston")
let setCountSessionLogin = async (username) => {
    const session = username + "_session"
    let userSession = await clientRedis.GET(session) | ''
    if(!userSession) {
        let obj = {
            count : 0,
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 1800000
        }
        await clientRedis.SET(session, JSON.stringify(obj))
        return 'set'
    }
    let obj = JSON.parse(userSession)
    let count = obj.count + 1
    if(count <=3 ) {
        await clientRedis.SET(session, JSON.stringify({
            count : count,
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 1800000
        }))
        return 'set'
    }
    return 'block'
}