const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name             : String,
    created          : {
        type         : Date,
        default      : Date.now
    },
    manager          : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                        },
    users            : [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                        }]
})

//methods
// get users of the project
projectSchema.statics.getUsers = function({ _id, manager}){
  return this.aggregate([
    { $match: { '_id': mongoose.Types.ObjectId(_id) }},
    { $match: { 'manager': manager }},
    { $limit : 1 },
    { $lookup: {
      from: 'users', localField: 'users', foreignField: '_id', as: 'participants'
    }},
    { $unwind : "$participants" },
    { $project: {
      _id: 0,
      study: '$name',
      name: '$participants.name',
      email: '$participants.email',
      id: '$participants._id',
      createdAt: '$participants.createdAt',
    }}
  ])
}

module.exports = mongoose.model('project', projectSchema);
