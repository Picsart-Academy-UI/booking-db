const mongoose = require('mongoose');

const User = require('./models/User');
const Team = require('./models/Team');
const Chair = require('./models/Chair');
const Positions = require('./models/Positions');
const Reservation = require('./models/Reservation');

let connection;
let is_connected = false;

const dbConnection = (MONGO_URI) => {
  if (is_connected) {
    return connection;
  }
  connection = mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

  is_connected = true;
  return connection;
};

module.exports = {
  User,
  Team,
  Chair,
  Positions,
  Reservation,
  dbConnection,
};
