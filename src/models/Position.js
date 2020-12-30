const mongoose = require('mongoose');

const { Schema } = mongoose;

const PositionSchema = new Schema({
  position_name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('position', PositionSchema);
