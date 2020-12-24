const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  date_start: {
    type: Date,
    required: true,
  },
  date_end: Date,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chair',
  },
  status: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('reservation', ReservationSchema);
