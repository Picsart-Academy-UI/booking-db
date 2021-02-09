const mongoose = require('mongoose');
const { MongoAuthFailed } = require('./utils/errorResponse');

let connect;
let is_connected;

const default_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

exports.connectDB = (mongo_uri, options = default_options) => {
  if (is_connected) {
    return connect;
  }
  connect = mongoose.connect(mongo_uri, options);

  mongoose.connection.once('open', () => {
    console.info('MongoDB connected to DB.');
  });

  mongoose.connection.on('error', (error) => {
    throw new error.message;
  });

  is_connected = true;
  return connect;
};

exports.mongoClose = (cb1, cb2) => {
  return mongoose.connection.close(false, cb1, cb2);
};
