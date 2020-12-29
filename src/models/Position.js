const mongoose = require('mongoose');

const { Schema } = mongoose;

const PositionSchema = new Schema({
  position_name: {
    type: String,
    required: [true, 'Please provide a position name'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('position', PositionSchema);
