const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

TeamSchema.virtual('members_count', {
  ref: 'User',
  localField: '_id',
  foreignField: 'team_id',
  count: true,
});

TeamSchema.virtual('tables', {
  ref: 'Table',
  localField: '_id',
  foreignField: 'team_id',
});

TeamSchema.plugin(idValidator);

module.exports = mongoose.model('Team', TeamSchema);
