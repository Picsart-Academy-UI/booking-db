const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: {
    type: Number,
  },
});

module.exports = mongoose.model('chair', ChairSchema);
