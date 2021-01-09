const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

TeamSchema.virtual('members_count', {
  ref: 'User',
  localField: 'team_name',
  foreignField: 'team_id',
  count: true,
});

TeamSchema.virtual('tables', {
  ref: 'Table',
  localField: 'team_name',
  foreignField: 'team_id'
});

module.exports = mongoose.model('Team', TeamSchema);
