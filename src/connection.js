const mongoose = require('mongoose');

let connect;
let is_connected;

const default_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  returnOriginal: false,
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
    throw new error.message();
  });

  is_connected = true;
  return connect;
};

exports.mongoClose = (cb1, cb2) => mongoose.connection.close(false, cb1, cb2);
