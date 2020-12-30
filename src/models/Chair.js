const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: {
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('chair', ChairSchema);
