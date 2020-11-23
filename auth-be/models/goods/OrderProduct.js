const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston");
const configGDrive = require("../../utils/configGDrive");
const Product = require("./Product");

class OrderProduct extends Model {}

OrderProduct.init({
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
    number: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    isPurechase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db,
    modelName: "OrderProduct"
});

Product.hasMany(OrderProduct, {
    foreignKey: 'productId'
})

db.sync()

if (db.model.Product === Product) {
    logger.info("---------INIT-OrderProduct---------")
    logger.info("OrderProduct are init into database")
    logger.info("---------------------------")
}

module.exports = OrderProduct
