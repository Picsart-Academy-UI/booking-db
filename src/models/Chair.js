const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: {
    type: Number,
    unique: true,
    required: true,
  },
  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ChairSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  await mongoose.model('Reservation').deleteMany({ chair_id: doc._id }, next);
});

ChairSchema.plugin(idValidator);

module.exports = mongoose.model('Chair', ChairSchema);
