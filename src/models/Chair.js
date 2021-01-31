const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const ChairSchema = new Schema({
  number: {
    type: Number,
    unique: true,
    required: true,
  },
}, { timestamps: true, versionKey: false });

ChairSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  await mongoose
      .model('Table')
      .updateMany(
          { chairs_count: { $gte: doc.number } },
          { $set: { chairs_count: doc.number - 1 } },
          { new: true, runValidators: true },
      );

  await mongoose.model('Reservation').deleteMany({ chair_id: doc._id }, next);
});

ChairSchema.plugin(idValidator);

module.exports = mongoose.model('Chair', ChairSchema);
