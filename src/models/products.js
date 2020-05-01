module.exports = (sequelize, DataType) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validade: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Products.associate = (models) =>{
        Products.belongsTo(models.Users);
    }
    return Products;
};