const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new mongoose.Schema({
  url: String
});

const vehicleSchema = new Schema({
  photos: [photoSchema],
  version: {
    type: Schema.Types.ObjectId,
    ref: 'version',
  },
  model: {
    type: Schema.Types.ObjectId,
    ref: 'model',
    index: true
  },
  make: {
    type: Schema.Types.ObjectId,
    ref: 'make',
    index: true
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: 'color',
    index: true
  },
});

module.exports = mongoose.model('vehicle', vehicleSchema);
