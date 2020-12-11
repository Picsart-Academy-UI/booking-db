const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChairSchema = new Schema({
    number: {
        type: Number
    },
    is_free: {
      type: Boolean,
      default: true
    },
    coordinates: {
        type: Array
    }
});

module.exports = mongoose.model('chair', ChairSchema);