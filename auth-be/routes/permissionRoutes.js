const Permission = require("../api/user/permission")

const PERMISSION_API = "/api/v2/permission"
const PERMISSION_API_GROUP = "/api/v2/permission/group"
module.exports = (app) => {
    app.get(PERMISSION_API, (req, res) => Permission.findOne(req, res))
    app.get(PERMISSION_API+"/all", (req, res) => Permission.findAll(req, res))
    app.post(PERMISSION_API, (req, res) => Permission.insertOne(req, res))
    app.delete(PERMISSION_API, (req, res) => Permission.delete(req, res))
    app.post(PERMISSION_API_GROUP, (req, res) => Permission.addUserToGroup(req, res))
    app.delete(PERMISSION_API_GROUP, (req, res) => Permission.deleteUserInGroup(req, res))
    app.put(PERMISSION_API_GROUP, (req, res) => Permission.updatePermissionGroup(req, res))
}