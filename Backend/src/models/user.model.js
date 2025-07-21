import enums from './enums.js'
export default (sequelize, DataTypes) =>
    sequelize.define('Users', {
        userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING(100), allowNull: false, unique: true },   
        password: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        role: {
            type: DataTypes.ENUM(enums.RoleEnum),
            allowNull: false,
            defaultValue: 'user'
        }
    },
    {
        timestamps: false,
        tableName: 'Users'
    });
