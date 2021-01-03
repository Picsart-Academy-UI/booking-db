const mongoose = require('mongoose');
const { email_reg } = require('../utils/regexps');

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  email: {
    lowercase: true,
    type: String,
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
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  position_id: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
  },
  is_admin: {
    type: Boolean,
    default: false,
    index: true,
  },
  push_subscriptions: {
    type: Array,
  },
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);
