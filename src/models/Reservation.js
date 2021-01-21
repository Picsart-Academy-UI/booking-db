const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

ReservationSchema.plugin(idValidator);

ReservationSchema.methods.weekendValidator = (start, end) => {
  let d1 = new Date(start),
      d2 = new Date(end),
      isWeekend = false;

  while (d1 < d2) {
    let day = d1.getDate();
    isWeekend = (day === 6) || (day === 0);

    if (isWeekend) return true;

    d1.setDate(d1.getDate() + 1);
  }
  return false;
};

module.exports = mongoose.model('Reservation', ReservationSchema);
