const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a name'],
  },
}, { timestamps: true });

module.exports = mongoose.model('team', TeamSchema);
