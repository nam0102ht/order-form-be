const categories = require("../api/goods/categories")
const categoriesType =  require("../api/goods/categoriesType")
const CATEGORIES_API = "/api/v2/categories"
const TYPES_API_CATEGORIES = CATEGORIES_API + "/type"

module.exports = (app) => {
    app.get(CATEGORIES_API, (req, res) => categories.getCategory(req, res))
    app.post(CATEGORIES_API, (req, res) => categories.createCategory(req, res))
    app.put(CATEGORIES_API, (req, res) => categories.updateCategory(req, res))
    app.post(TYPES_API_CATEGORIES,(req, res) => categoriesType.createCategoriesType(req, res))
    app.put(TYPES_API_CATEGORIES, (req, res) => categoriesType.updateCategoriesType(req, res))
    app.get(TYPES_API_CATEGORIES+"/all", (req, res) => categoriesType.getTypesByCategory(req, res))
    app.get(TYPES_API_CATEGORIES, (req, res) => categoriesType.getCategoryByTypeAll(req, res))
}