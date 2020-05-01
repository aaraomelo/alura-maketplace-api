module.exports = (sequelize, DataType) => {
    const Posts = sequelize.define('Posts', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
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

    Posts.associate = (models) =>{
        Posts.belongsTo(models.Users);
    }

    return Posts;
};