
export default (sequelize, DataTypes) =>
    sequelize.define('Catering', {
        cateringId: DataTypes.integer, auto_increment: true, primaryKey: true,
        catering_set: DataTypes.STRING, allowNull: false,
        price: DataTypes.FLOAT, allowNull: false,
    });