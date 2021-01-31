const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { BadRequest, Conflict } = require('../utils/errorResponse');

const { checkDates, checkWeekends,
        formatDates, conflictingReservations} = require('../utils/reservation-helpers');

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
    immutable: true
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    index: true,
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
}, { timestamps: true });

ReservationSchema.pre('validate', async function (next){
    // formatting the dates;
    this.formattedDates = formatDates(this.start_date, this.end_date);
    return next();
});

ReservationSchema.pre('validate', async function (next) {
    if (!checkDates(this.formattedDates.start_date, this.formattedDates.end_date)) {
      return next(new BadRequest('Reservations must have appropriate dates'));
    }
    return next();
});

ReservationSchema.pre('validate', async function (next){
    if (checkWeekends(this.formattedDates.start_date, this.formattedDates.end_date)) {
      return next(new BadRequest('The reservation should not have weekends'));
    }
    return next();
});

ReservationSchema.pre('validate', async function (next){

    const foundReservations = await conflictingReservations(
      this.formattedDates.start_date,
      this.formattedDates.end_date,
      this.chair_id
    );
  console.log(foundReservations);
    if (foundReservations.length > 0) return next(new Conflict('Conflict with existing reservations'))
    return next();

});

ReservationSchema.plugin(idValidator);

module.exports = mongoose.model('Reservation', ReservationSchema);
