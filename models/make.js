const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const makeSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true
  }
});

module.exports = mongoose.model('make', makeSchema);
