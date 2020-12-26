const mongoose = require('mongoose');

exports.MongooseError = mongoose.Error;

exports.User = require('./models/User');
exports.Team = require('./models/Team');
exports.Chair = require('./models/Chair');
exports.Position = require('./models/Position');
exports.Reservation = require('./models/Reservation');

let connection;
let is_connected = false;

exports.dbConnection = (MONGO_URI) => {
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
