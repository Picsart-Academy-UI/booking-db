const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chair',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
