const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  chair_number: {
    unique: false,
    type: Number,
    required: true,
  },

  table_id: {
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }
}, { timestamps: true, versionKey: false});


ChairSchema.index({
  table_id: 1,
  number: 1
}, {unique: true})

ChairSchema.index({
    chair_number: 1,
    table_id: 1
}, { unique: true });

ChairSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function(next) {
      const doc = await this.model.findOne(this.getFilter());
      await mongoose.model('Reservation').deleteMany({ chair_id: doc._id }, next);
    }
);

ChairSchema.plugin(idValidator);

module.exports = mongoose.model('Chair', ChairSchema);
