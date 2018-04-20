const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true
  }
});

module.exports = mongoose.model('version', versionSchema);
