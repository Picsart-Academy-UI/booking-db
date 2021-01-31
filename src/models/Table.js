const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const TableSchema = new Schema({
  table_number: {
    type: Number,
    unique: true,
    required: true,
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  chairs_count: {
    type: Number,
    required: true,
    default: 6,
  },
  table_config: Object,
}, { timestamps: true, versionKey: false });

TableSchema.pre('save', async function (next) {
  const numberOfMaxChair = await mongoose
      .model('Chair')
      .findOne({}, { number: 1 })
      .sort({ number: -1 })
      .limit(1);

  const diffChairsCount = this.chairs_count - numberOfMaxChair.number;

  if (diffChairsCount > 0)
    for (let i = numberOfMaxChair.number + 1; i <= this.chairs_count; i++) {
      await ChairModel.create({ number: i }, next);
    }

});

TableSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function(next) {
      const doc = await this.model.findOne(this.getFilter());
      await mongoose
          .model('Reservation')
          .deleteMany({ table_id: doc._id }, next);
    }
);

TableSchema.plugin(idValidator);

module.exports = mongoose.model('Table', TableSchema);
