const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const makeSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true
  },
  slug: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('make', makeSchema);
