const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
