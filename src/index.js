const { connectDB, mongoClose } = require('./connection');

const User = require('./models/User');
const Team = require('./models/Team');
const Chair = require('./models/Chair');
const Table = require('./models/Table');
const Reservation = require('./models/Reservation');

module.exports = {
    connectDB, mongoClose, User, Team, Chair, Table, Reservation
}
