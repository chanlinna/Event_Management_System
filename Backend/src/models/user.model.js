export default (sequelize, DataTypes) =>
    sequelize.define('Users', {
        userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },   
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
    });