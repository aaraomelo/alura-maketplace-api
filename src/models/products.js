module.exports = (sequelize, DataType) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "É necessário uma descrição do produto"
                },
                len: {
                    args: [10, 1000],
                    msg: "A descrição deve ter no mínimo 10 caracteres"
                }
            }
        },
        price: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "É necessário informar o preço do produto"
                },
                isDecimal: {
                    args: true,
                    msg: "O preço deve ser um número decimal"
                }
            }
        },
        image: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "É necessário uma imagem do produto"
                }
            }
        }
    })

    Products.associate = (models) =>{
        Products.belongsTo(models.Users);
    }
    return Products;
};