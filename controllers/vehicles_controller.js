const Vehicle = require('../models/vehicle');
const Make = require('../models/make');
const Model = require('../models/model');
const Color = require('../models/color');
const Version = require('../models/version');

const vehiclesController = {
  search: (req, res, next) => {
    return getCriteria(req.query)
      .then(criteria => {
        return Vehicle.find(criteria)
          .limit(req.query.limit ? parseInt(req.query.limit) : 20) // proper pagination is not included
          .populate(['make', 'model', 'version']);
      })
      .then(vehicles => res.send(vehicles))
      .catch(err => next(err));
  },
  filters: (req, res, next) => {
    return getCriteria(req.query)
      .then(criteria => {
        const aggregates = [
          facetAggregate(Make, 'make', except(criteria, ['make', 'model'])),
          facetAggregate(Model, 'model', except(criteria, ['model'])),
          facetAggregate(Color, 'color', except(criteria, ['color'])),
        ];
        return Promise.all(aggregates);
      })
      .then(([makes, models, colors]) => {
        res.send({
          makes,
          models,
          colors
        });
      })
      .catch(err => next(err));
  }
};

async function getCriteria(query) {
  const criteria = {};
  // Convert Slugs to IDs
  if (query.make) {
    const make = await Make.findOne({ slug: query.make });
    criteria.make = make ? make._id : undefined;
  }
  if (query.model) {
    const model = await Model.findOne({ slug: query.model });
    criteria.model = model ? model._id : undefined;
  }
  if (query.color) {
    const color = await Color.findOne({ slug: query.color });
    criteria.color = color ? color._id : undefined;
  }
  return criteria;
}

function except(obj, exceptProps) {
  const clone = {...obj};
  for (prop of exceptProps) {
    delete clone[prop];
  }
  return clone;
}

function facetAggregate(model, foreignField, criteria) {
  const vehiclesCriteria = {};
  for (key in criteria) {
    vehiclesCriteria['vehicles.'+key] = criteria[key];
  }
  return model.aggregate()
    .lookup({
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
    .project({
      slug: 1,
      name: 1
    })
    .sort('name');
}

module.exports = vehiclesController;

