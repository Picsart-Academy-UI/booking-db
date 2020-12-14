const mongoose = require('mongoose');

const User = require('./models/User');
const Team = require('./models/Team');
const Chair = require('./models/Chair');
const Reservation = require('./models/Reservation');

module.exports = {
  User,
  Reservation,
  Team,
  Chair,
  dbConnection: (MONGO_URI) => {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log('Mongoose connected'))
      .catch((error) => console.error(error.message));

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB.');
    });

    mongoose.connection.on('error', (err) => {
      console.log(err.message);
    });

    mongoose.connection.on('disconnect', () => {
      console.log('Mongoose connection is disconnected.');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  },
};
