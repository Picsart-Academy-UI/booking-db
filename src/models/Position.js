const mongoose = require('mongoose');

const { Schema } = mongoose;

const PositionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members_count: {
    type: Number,
  },
});

module.exports = mongoose.model('position', PositionSchema);
