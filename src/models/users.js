module.exports = (sequelize, DataType) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "É necessário o nome"
                },
                is: {
                    args: ["^[a-z]+$", 'i'],
                    msg: "Utilize somente letras no nome"
                },
                len: {
                    args: [3, 32],
                    msg: "Utilize de 3 até 32 letras no nome "
                }
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "É necessário a senha"
                },
                len: {
                    args: [6, 1000],
                    msg: "A senha deve ter no mínimo 6 caracteres"
                }
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email já cadastrado'
            },
            lowercase: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Entre com um email válido'
                }
            }
        }
    })
    Users.associate = (models) =>{
        Users.hasMany(models.Products);
        Users.hasMany(models.Posts);
    }
    return Users;
}