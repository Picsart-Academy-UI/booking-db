const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: Number,
});

module.exports = mongoose.model('chair', ChairSchema);
