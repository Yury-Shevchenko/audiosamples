const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  title: String,
  author: String,
  filename: String,
  created: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  survey: String,
});

module.exports = mongoose.model('record', recordSchema);
