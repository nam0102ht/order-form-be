const db = require("../../utils/connectDB")
const { DataTypes, Model } = require("sequelize");
const logger = require("../../logger/winston")
const Categories = require("./Categories")
const Type = require("./Type")

class CategoriesType extends Model {}

CategoriesType.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    modelName: "CategoriesType"
});

Categories.belongsToMany(Type, {
    through: "CategoriesType",
    as: "Types",
    foreignKey: "categoryID",
    otherKey: "typeId"
})

Type.belongsToMany(Categories, {
    through: "CategoriesType",
    as: "Categories",
    foreignKey: "typeId",
    otherKey: "categoryID"
})

db.sync()

if (db.model.CategoriesType === CategoriesType) {
    logger.info("---------INIT-CategoriesType---------")
    logger.info("CategoriesType is init into database")
    logger.info("--------------------------------------")
}

module.exports = CategoriesType
