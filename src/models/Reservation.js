const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./User');

const Team = require('./Team');

const Table = require('./Table');

const Chair = require('./Chair');

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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: Team,
    required: true,
    index: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: Table,
    required: true,
    index: true,
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: Chair,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
