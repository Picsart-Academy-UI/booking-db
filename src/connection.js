const mongoose = require('mongoose');

let connection;
let is_connected;

const default_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = (mongo_uri, options = default_options) => {
  if (is_connected) {
    return connection;
  }
  connection = mongoose.connect(mongo_uri, options);
  is_connected = true;
  return connection;
};
