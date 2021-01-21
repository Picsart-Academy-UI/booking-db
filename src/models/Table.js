const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const TableSchema = new Schema({
  table_name: {
    type: String,
    unique: true,
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  table_config: Object,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

TableSchema.virtual('chairs_count', {
  ref: 'Chair',
  localField: '_id',
  foreignField: 'table_id',
  count: true,
});

TableSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  const doc = await this.model.findOne(this.getFilter());

  await mongoose.model('Chair').deleteMany({ table_id: doc._id }, next);
  await mongoose.model('Reservation').deleteMany({ table_id: doc._id }, next);
});

TableSchema.plugin(idValidator);

module.exports = mongoose.model('Table', TableSchema);
