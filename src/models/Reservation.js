const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  date_start: {
    type: Date,
    required: true,
  },
  date_end: {
    type: Date,
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
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chair',
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
});

module.exports = mongoose.model('reservation', ReservationSchema);
