const mongoose = require('mongoose');


const {ReservationSplit, BadRequest, Conflict} = require('../utils/errorResponse');

const {checkReservationDates, conflictingReservations, getToday,
       formatDates, divideReservation} = require('../utils/reservation-helpers');

exports.attachFormattedDates = async function (next){
  // formatting the dates;
  this.formattedDates = formatDates(this.start_date, this.end_date);
  return next();
}

exports.checkFormattedDates = async function (next) {
  if (!checkReservationDates(this.formattedDates)) {
    return next(new BadRequest('Reservations must have appropriate dates'));
  }
  return next();
}

exports.checkConflictingReservations =async function (next){
  const check = {...this.formattedDates, chair_id: this.chair_id, user_id: this.user_id };
  const foundReservations = await conflictingReservations(check);
  if (foundReservations.length > 0) return next(new Conflict('Conflict with existing reservations'))
  return next();
}

exports.checkUserId =  async function (){
  const foundUser = await mongoose.model('User').findOne(
    {_id: this.user_id, team_id: this.team_id}).lean().exec();
  if (!foundUser) throw new BadRequest('The user_id has a no relation with team_id');
}

exports.chekTableId = async function (){
  const foundTable = await mongoose.model('Table').findOne(
    {_id: this.table_id, team_id: this.team_id}).lean().exec();
  if (!foundTable) throw new BadRequest('The table_id has a no relation with team_id');
}

exports.checkChairId = async function (){
  const foundChair = await mongoose.model('Chair').findOne(
    {_id: this.chair_id, table_id: this.table_id}).lean().exec();
  if (!foundChair) throw new BadRequest('The chair_id has no relation with table_id');
}

exports.checkForToday = async function (next){
  if (this.status === 'approved') return next();
  const today = getToday();
  if (this.formattedDates.end_date === today) {
    this.status = 'approved';
    return next();
  }
  if (this.formattedDates.start_date === today){
    const divided = divideReservation(this);
    const reservations = await mongoose.model('Reservation')
      .insertMany(divided);
    throw new ReservationSplit('Reservation was split', reservations);
  }
  return next();
}
