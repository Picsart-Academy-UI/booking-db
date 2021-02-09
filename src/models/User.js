const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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
    required: true,
    default: false,
  },
  email: {
    lowercase: true,
    type: String,
    required: true,
    match: [email_reg, 'Please provide a valid email'],
    unique: true,
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
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  push_subscriptions: {
    type: Array,
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

UserSchema.pre('deleteOne', { document: false, query: true }, async (next) => {
  const doc = await this.model.findOne(this.getFilter());
  await mongoose.model('Reservation').deleteMany({ user_id: doc._id }, next);
});

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema);
