const auth = require("../api/user/auth")

const AUTH_API = "/api/v2/auth"

module.exports = (app) => {
    app.post(AUTH_API, (req, res) => auth.login(req, res))
}