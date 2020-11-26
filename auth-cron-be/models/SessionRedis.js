const clientRedis = require("../utils/connectRedis")
const logger = require("../logger/winston")

let getDateSessionBlock = async (username) => {
    const session = username + "_session"
    let userPromise = new Promise((resolve, reject) => {
        clientRedis.GET(session, (err, reply) => {
            if(err) reject(err)
            resolve(reply)
        }) | ''
    })
    if(userPromise) {
        return userPromise
    }
    return null
}

let getValueRedis = (key) => {
    return new Promise((resolve, reject)=> {
        clientRedis.GET(key, (err, reply) => {
            if(err) reject(err)
            resolve(reply)
        })
    })
}

let setCountSessionLogin = async (username) => {
    const session = username + "_session"
    let userSession = await getValueRedis(session) || ''
    if(!userSession) {
        let obj = {
            count : 0,
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 1800000
        }
        clientRedis.SET(session, JSON.stringify(obj))
        return 'set'
    }
    let obj = JSON.parse(userSession)
    let count = obj.count + 1
    if(count <=3 ) {
        clientRedis.DEL(session)
        clientRedis.SET(session, JSON.stringify({
            count : count,
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 1800000
        }))
        return 'set'
    }
    if(count > 3) {
        let delta = userSession.timeEnd - new Date().getTime()
        clientRedis.DEL(session)
        clientRedis.SET(session, JSON.stringify({
            count : count,
            timeStart: new Date().getTime(),
            timeEnd: new Date().getTime() + 1800000 * Math.round(count / 2)
        }))
        return 'block'
    }
    return 'set'
}

let removeUserLoginFaild = async (username) => {
    const session = username + "_session"
    let userSession = getValueRedis(session) || ''
    if(!userSession) {
        return 'set'
    }
    clientRedis.DEL(session)
    return 'del'
}

module.exports = {
    setCountSessionLogin: setCountSessionLogin,
    removeUserLoginFaild: removeUserLoginFaild,
    getDateSessionBlock: getDateSessionBlock
}