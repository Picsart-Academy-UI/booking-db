const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const TableSchema = new Schema({
  table_number: {
    unique: false,
    type: Number,
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  chairs_count: {
    type: Number,
    required: true,
    default: 6,
  },
  table_config: Object,
}, { timestamps: true, versionKey: false });

TableSchema.index({
  team_id: 1,
  table_number: 1
}, { unique: true });

TableSchema.virtual('chairs', {
  ref: 'Chair',
  localField: '_id',
  foreignField: 'table_id',
});

TableSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function(next) {
      const doc = await this.model.findOne(this.getFilter());
      await mongoose
          .model('Chair')
          .deleteMany({ table_id: doc._id }, next);

      await mongoose
          .model('Reservation')
          .deleteMany({ table_id: doc._id }, next);
    }
);

TableSchema.plugin(idValidator);

module.exports = mongoose.model('Table', TableSchema);
