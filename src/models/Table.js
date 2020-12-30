const mongoose = require('mongoose');

const { Schema } = mongoose;

const TableSchema = new Schema({
  table_name: {
    type: String,
    unique: true,
    required: true,
  },
  chairs_count: {
    type: Number,
    default: 6,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  table_config: Object,
}, { timestamps: true });

module.exports = mongoose.model('table', TableSchema);
