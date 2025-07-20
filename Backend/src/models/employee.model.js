export default (sequelize, DataTypes) =>
    sequelize.define('Employee', {
        employeeId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        salary: { type: DataTypes.FLOAT, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: true },
        dob: { type: DataTypes.DATE, allowNull: true },
    });