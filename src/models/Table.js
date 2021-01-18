const mongoose = require('mongoose');

const Team = require('./Team');

const { Schema } = mongoose;

const TableSchema = new Schema({
  table_name: {
    type: String,
    unique: true,
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: Team,
  },
  table_config: Object,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

TableSchema.virtual('chairs_count', {
  ref: 'Chair',
  localField: '_id',
  foreignField: 'table_id',
  count: true,
});

module.exports = mongoose.model('Table', TableSchema);
