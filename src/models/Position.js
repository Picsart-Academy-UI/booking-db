const mongoose = require('mongoose');

const { Schema } = mongoose;

const PositionSchema = new Schema({
  position_name: {
    type: String,
    required: [true, 'Please provide a position name'],
  },
});

module.exports = mongoose.model('position', PositionSchema);
