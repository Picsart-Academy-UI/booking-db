const mongoose = require('mongoose');
const moment = require('moment-timezone');

const format = 'YYYY-MM-DD';

const getToday = () => moment().tz('Asia/Yerevan').format(format);

const formatDate = (date) => moment(date).format(format);

const formatDates = (start, end) => ({
  start_date: moment(start).format(format),
  end_date: moment(end).format(format),
});

const checkReservationDates = (reservation) => {
  const { start_date, end_date } = reservation;
  const start = formatDate(start_date);
  const end = formatDate(end_date);
  const today = getToday();
  return start >= today && end >= today && end >= start;
};

const checkRange = (oldReservation, newReservation) => {
  const newStart = formatDate(newReservation.start_date);
  const newEnd = formatDate(newReservation.end_date);
  const oldStart = formatDate(oldReservation.start_date);
  const oldEnd = formatDate(oldReservation.end_date);
  const startCheck = newStart >= oldStart && newStart <= oldEnd;
  const endCheck = newEnd >= oldStart && newEnd <= oldEnd;
  return startCheck && endCheck;
};

const conflictingReservations = (reservation) => {
  const { start_date, end_date, user_id } = reservation;
  return mongoose.model('Reservation').find({
    $or: [
      {
        start_date: { $lte: start_date },
        end_date: { $gte: start_date },
        status: ['pending', 'approved']
      },
      {
        start_date: { $gte: start_date },
        end_date: { $lte: end_date },
        status: ['pending', 'approved']
      },
      {
        start_date: { $eq: end_date },
        status: ['pending', 'approved']
      }
    ],
    user_id
  }).sort('rating');
};

const divideReservation = (reservation) => {
  const {
    start_date, end_date,
    table_id, chair_id,
    team_id, user_id
  } = reservation;

  const reserve_1 = {
    start_date,
    end_date: start_date,
    status: 'approved',
    chair_id,
    table_id,
    team_id,
    user_id,
  };

  const reserve_2 = {
    start_date: moment(reservation.start_date).add(1, 'day').format(format),
    end_date,
    status: 'pending',
    chair_id,
    table_id,
    team_id,
    user_id,
  };

  return [reserve_1, reserve_2];
};

const attachMissingFields = (reservation, foundReservation) => ({
  start_date: reservation.start_date || foundReservation.start_date,
  end_date: reservation.end_date || foundReservation.end_date,
  table_id: reservation.table_id || foundReservation.table_id,
  chair_id: reservation.chair_id || foundReservation.chair_id,
  team_id: reservation.team_id || foundReservation.team_id,
  user_id: reservation.user_id || foundReservation.user_id,
  status: reservation.status || foundReservation.status
});

module.exports = {
  getToday,
  formatDates,
  conflictingReservations,
  divideReservation,
  checkReservationDates,
  attachMissingFields,
  checkRange
};
