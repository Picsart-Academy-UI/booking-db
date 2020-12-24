const mongoose = require('mongoose');

const { Schema } = mongoose;

const TableSchema = new Schema({
  number: Number,
  chairs_count: Number,
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  table_config: Object,
});

module.exports = mongoose.model('table', TableSchema);
