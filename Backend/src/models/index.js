import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';
import VenueModel from './venue.model.js';
import CateringeModel from './catering.model.js';
import EmployeeModel from './employee.model.js';
import EventModel from './event.model.js';
import UserModel from './user.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Venue = VenueModel(sequelize, Sequelize);
db.Catering = CateringeModel(sequelize, Sequelize);
db.Employee = EmployeeModel(sequelize, Sequelize);
db.Event = EventModel(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);

// Associations
db.Venue.hasMany(db.Event, { foreignKey: 'venueId' });
db.Event.belongsTo(db.Venue, { foreignKey: 'venueId' });

db.Catering.hasMany(db.Event);
db.Event.belongsTo(db.Catering);
db.Catering.belongsToMany(db.Event, { through: 'EventCatering', foreignKey: 'cateringId' });
db.Event.belongsToMany(db.Catering, { through: 'EventCatering', foreignKey: 'eventId' });



db.Employee.hasMany(db.Event, { foreignKey: 'employeeId' });
db.Event.belongsTo(db.Employee, { foreignKey: 'employeeId' });
db.Employee.belongsToMany(db.Event, { through: 'EmployeeEvent', foreignKey: 'employeeId' });
db.Event.belongsToMany(db.Employee, { through: 'EmployeeEvent', foreignKey: 'eventId' });





await sequelize.sync({ alter: true }); // dev only

export default db;
