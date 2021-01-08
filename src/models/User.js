const mongoose = require('mongoose');

const Team = require('./Team');

const { email_reg } = require('../utils/regexps');

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  email: {
    lowercase: true,
    type: String,
    required: true,
    match: [email_reg, 'Please provide a valid email'],
    unique: true,
    index: true,
  },
  phone: {
    type: Number,
  },
  birthday: {
    type: Date,
  },
  profile_picture: {
    type: String,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  position_id: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
    index: true,
  },
  push_subscriptions: {
    type: Array
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
