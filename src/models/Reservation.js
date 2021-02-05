const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { BadRequest, Conflict } = require('../utils/errorResponse');

const { checkFormattedDates,
  attachFormattedDates, checkConflictingReservations,
  chekTableId, checkChairId,
  checkUserId} = require('../utils/reservation-helpers');

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
    immutable: true
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    immutable: true
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
    index: true,
    immutable: true
  },
  chair_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chair',
    required: true,
    immutable: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true, versionKey: false });

ReservationSchema.pre('validate', attachFormattedDates);

ReservationSchema.pre('validate', checkFormattedDates);

ReservationSchema.pre('validate', checkConflictingReservations);

ReservationSchema.post('validate',checkUserId);

ReservationSchema.post('validate', chekTableId);

ReservationSchema.post('validate',checkChairId )

ReservationSchema.plugin(idValidator);

module.exports = mongoose.model('Reservation', ReservationSchema);
