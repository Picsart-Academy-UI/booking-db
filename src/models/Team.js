const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members_count: {
    type: Number,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('team', TeamSchema);
