const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  available_chairs: {
    type: [],
  },
  table_config: {
    type: Object,
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
