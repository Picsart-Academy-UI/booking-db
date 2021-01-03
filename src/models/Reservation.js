const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  start_date: {
    type: Date,
    required: true,
    index: true,
  },
  end_date: {
    type: Date,
    index: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    index: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
    index: true,
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chair',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    index: true,
  },
}, { timestamps: true });

ReservationSchema.createIndex({
  start_date: 1,
  team_id: 1,
  table_id: 1,
  chair_id: 1,
}, { unique: true });

module.exports = mongoose.model('reservation', ReservationSchema);
