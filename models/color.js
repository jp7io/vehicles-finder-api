const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true
  }
});

module.exports = mongoose.model('color', colorSchema);
