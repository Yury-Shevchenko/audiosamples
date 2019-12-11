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
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                       },
})

module.exports = mongoose.model('record', recordSchema);
