const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    title            : String,
    author           : String,
    filename         : String,
    created          : {
        type         : Date,
        default      : Date.now
    },
    user             : {
                        type: mongoose.Schema.ObjectId,
                        ref: 'User'
                       },
})

module.exports = mongoose.model('Record', recordSchema);
