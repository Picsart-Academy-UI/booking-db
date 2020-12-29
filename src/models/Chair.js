const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: {
    type: Number,
    required: [true, 'Please provide a chair name'],
  },
});

module.exports = mongoose.model('chair', ChairSchema);
