export default (sequelize, DataTypes) =>
    sequelize.define ('Event_Type', {
        eventTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNUll: false
        }
    }, {
        timestamps: false,
        tableName: 'Event_Types'
    });