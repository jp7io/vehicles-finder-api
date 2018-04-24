const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true
  }
});

module.exports = mongoose.model('model', modelSchema);
