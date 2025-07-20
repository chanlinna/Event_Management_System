
export default (sequelize, DataTypes) =>
    sequelize.define('Venues', {
        venueId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        capacity: { type: DataTypes.INTEGER, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
    });