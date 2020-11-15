const user = require("../api/user/user")

const API_USER = "/api/v2/user"
const API_USER_GROUP = API_USER + "/group"

module.exports = (app) => {
    app.get(API_USER, (req, res) => user.findUserById(req, res))
    app.post(API_USER, (req, res) => user.insertOne(req, res))
    app.delete(API_USER, (req, res) => user.deleteUser(req, res))
    app.post(API_USER+"/block", (req, res) => user.blockUser(req, res))
    app.put(API_USER, (req, res) => user.updateUser(req, res))
    app.post(API_USER_GROUP,(req, res) => user.addToGroup(req, res))
    app.delete(API_USER_GROUP, (req, res) => user.deleteUserInGroup(req, res))
}