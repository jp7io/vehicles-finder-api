const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
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

module.exports = mongoose.model('color', colorSchema);
