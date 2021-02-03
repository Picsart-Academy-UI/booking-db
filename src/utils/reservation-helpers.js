const mongoose = require('mongoose');
const moment = require('moment-timezone');

const format = 'YYYY-MM-DD';

const getToday = () => moment().tz('Asia/Yerevan').format(format);

exports.formatDates = (start, end) => ({
  start_date: moment(start).format(format),
  end_date: moment(end).format(format),
});

exports.checkDates = (start_date, end_date) => {
  const today = getToday();
  return start_date >= today && end_date >= today && end_date >= start_date;
};


exports.conflictingReservations = (start_date, end_date, chair_id) => {
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
