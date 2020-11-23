const types = require("../api/goods/types")
const categoriesType =  require("../api/goods/categoriesType")
const TYPES_API = "/api/v2/types"
const TYPES_API_CATEGORIES = TYPES_API + "/categories"

module.exports = (app) => {
    app.get(TYPES_API, (req, res) => types.getType(req, res))
    app.post(TYPES_API, (req, res) => types.createType(req, res))
    app.put(TYPES_API, (req, res) => types.createType(req, res))
    app.post(TYPES_API_CATEGORIES,(req, res) => categoriesType.createCategoriesType(req, res))
    app.put(TYPES_API_CATEGORIES, (req, res) => categoriesType.updateCategoriesType(req, res))
    app.get(TYPES_API_CATEGORIES+"/all", (req, res) => categoriesType.getCategoryByType(req, res))
    app.get(TYPES_API_CATEGORIES, (req, res) => categoriesType.getCategoryByType(req, res))
}