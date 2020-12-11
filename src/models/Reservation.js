const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    date_in: {
        type: Date,
        required: true
    },
    date_out: {
        type: Date
    },
    broker_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chair_id: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('reservation', ReservationSchema);