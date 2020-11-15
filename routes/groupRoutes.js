const group = require("../api/user/group")

const API_USER = "/api/v2/group"

module.exports = (app) => {
    app.get(API_USER, (req, res) => group.findOne(req, res))
    app.post(API_USER, (req, res) => group.insertOne(req, res))
    app.put(API_USER, (req, res) => group.updateOne(req, res))
}