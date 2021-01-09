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
  localField: '_id',
  foreignField: 'team_id',
  count: true
});


module.exports = mongoose.model('Team', TeamSchema);
