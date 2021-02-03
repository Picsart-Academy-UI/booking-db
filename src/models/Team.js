const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { BadRequest } = require('../utils/errorResponse');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

TeamSchema.virtual('members_count', {
  ref: 'User',
  localField: '_id',
  foreignField: 'team_id',
  count: true,
});

TeamSchema.virtual('tables', {
  ref: 'Table',
  localField: '_id',
  foreignField: 'team_id',
});

TeamSchema.plugin(idValidator);

TeamSchema.pre(
    'deleteOne',
    { document: false, query: true },
    async function(next) {
      const doc = await this.model.findOne(this.getFilter()).populate('members_count');

      if (doc.members_count > 0) {
        return next(new BadRequest(
            `The ${doc.team_name} team cannot be deleted because it has employees.`
        ));
      }

      await mongoose
          .model('Table')
          .deleteMany({ team_id: doc._id }, next);

      await mongoose
          .model('Reservation')
          .deleteMany({ team_id: doc._id }, next);
    }
);

module.exports = mongoose.model('Team', TeamSchema);
