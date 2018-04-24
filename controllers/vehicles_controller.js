const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle');
const Make = require('../models/make');
const Model = require('../models/model');
const Color = require('../models/color');
const _ = require('lodash');

const vehiclesController = {
  search: (req, res, next) => {
    const criteria = _.pick(req.query, ['make', 'model', 'color']);

    return Vehicle.find(criteria)
      .limit(parseInt(req.query.limit) || 20) // only a draft for pagination
      .populate(['make', 'model', 'color'])
      .then(vehicles => res.send(vehicles))
      .catch(err => next(err));
  },
  filters: (req, res, next) => {
    const criteria = _.pick(req.query, ['make', 'model', 'color']);
    return Promise.all([
      facetAggregate(Make, 'make', _.omit(criteria, ['make', 'model'])),
      facetAggregate(Model, 'model', _.omit(criteria, ['model'])),
      facetAggregate(Color, 'color', _.omit(criteria, ['color'])),
    ])
    .then(([makes, models, colors]) => { // array destructuring
      res.send({ makes, models, colors });
    })
    .catch(err => next(err));
  }
};

function facetAggregate(model, foreignField, criteria) {
  const vehiclesCriteria = {};
  for (key in criteria) {
    vehiclesCriteria['vehicles.'+key] = mongoose.Types.ObjectId(criteria[key]);
  }
  return model.aggregate()
    .lookup({ // similar to SQL JOIN
      from: 'vehicles',
      localField: '_id',
      foreignField: foreignField,
      as: 'vehicles'
    })
    .match({
      vehicles: {
        $ne: [], // not empty
      },
      ...vehiclesCriteria
    })
    .project({ // select returning properties
      slug: 1,
      name: 1
    })
    .sort('name');
}

module.exports = vehiclesController;

