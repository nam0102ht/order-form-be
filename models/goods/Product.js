const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston");
const Categories = require("./Categories");
const configGDrive = require("../../utils/configGDrive");

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description: DataTypes.TEXT,
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPurechase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db,
    modelName: "Product"
});

Categories.hasMany(Product, {
    foreignKey: 'categoryId'
})

db.sync()

if (db.model.Product === Product) {
    logger.info("---------INIT-Product---------")
    logger.info("Product are init into database")
    logger.info("---------------------------")
}

module.exports = Product
