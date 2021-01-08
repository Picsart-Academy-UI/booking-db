const mongoose = require('mongoose');

const User = require('./User');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    unique: true,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
