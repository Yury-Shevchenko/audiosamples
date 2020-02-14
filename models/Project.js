const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  invitetoken: String,
});

// methods
// get users of the project
projectSchema.statics.getUsers = function({ _id, manager }) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(_id) } },
    { $match: { manager } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'users',
        localField: 'users',
        foreignField: '_id',
        as: 'participants',
      },
    },
    { $unwind: '$participants' },
    {
      $project: {
        _id: 0,
        study: '$name',
        name: '$participants.name',
        email: '$participants.email',
        id: '$participants._id',
        createdAt: '$participants.createdAt',
      },
    },
  ]);
};

module.exports = mongoose.model('project', projectSchema);
