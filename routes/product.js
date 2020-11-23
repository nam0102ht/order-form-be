const products = require("../api/goods/product")
const CATEGORIES_API = "/api/v2/product"
const TYPES_API_CATEGORIES = CATEGORIES_API + "/categories"

module.exports = (app) => {
    app.get(CATEGORIES_API, (req, res) => products.getProducts(req, res))
    app.post(CATEGORIES_API, (req, res) => products.createProducts(req, res))
    app.put(CATEGORIES_API, (req, res) => products.updateProduct(req, res))
    app.get(TYPES_API_CATEGORIES,(req, res) => products.getProductByCategory(req, res))
}