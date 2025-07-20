export default (sequelize, DataTypes) =>
    sequelize.define('Event', {
        eventId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false }, 
        startDate: { type: DataTypes.DATE, allowNull: false },
        endDate: { type: DataTypes.DATE, allowNull: false },
        cateringId: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'upcoming' },
        description: { type: DataTypes.TEXT, allowNull: true },
    });