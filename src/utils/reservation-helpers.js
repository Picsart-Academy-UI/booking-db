const mongoose = require('mongoose');
const moment = require('moment-timezone');

const format = 'YYYY-MM-DD';

const getToday = () => moment().tz('Asia/Yerevan').format(format);

const formatDates = (start, end) => ({
  start_date: moment(start).format(format),
  end_date: moment(end).format(format),
});

const checkDates = (start_date, end_date) => {
  const today = getToday();
  return start_date >= today && end_date >= today && end_date >= start_date;
};


const conflictingReservations = (start_date, end_date, chair_id) => {
  return mongoose.model('Reservation').find({
    $or: [
      {
        start_date: {$lte: start_date},
        end_date: {$gte: start_date},
        status: ['pending', 'approved']
      },
      {
        start_date: {$gte: start_date},
        end_date: {$lte: end_date},
        status: ['pending', 'approved']
      },
      {
        start_date: { $eq: end_date },
        status: ['pending', 'approved']
      }
    ],
    chair_id
  }).sort('rating');
}

exports.attachFormattedDates = async function (next){
  // formatting the dates;
  this.formattedDates = formatDates(this.start_date, this.end_date);
  return next();
}

exports.checkFormattedDates = async function (next) {
  if (!checkDates(this.formattedDates.start_date, this.formattedDates.end_date)) {
    return next(new BadRequest('Reservations must have appropriate dates'));
  }
  return next();
}

exports.checkConflictingReservations =async function (next){

  const foundReservations = await conflictingReservations(
    this.formattedDates.start_date,
    this.formattedDates.end_date,
    this.chair_id
  );
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

exports.checkChairId =async function (){
  const foundChair = await mongoose.model('Chair').findOne(
    {_id: this.chair_id, table_id: this.table_id}).lean().exec();
  if (!foundChair) throw new BadRequest('The chair_id has no relation with table_id');
}
