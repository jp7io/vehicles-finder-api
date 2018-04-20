const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const vehiclesController = require('./controllers/vehicles_controller');

mongoose.connect('mongodb://localhost/vehicles');

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Use /vehicles/search or /vehicles/filters'));

app.get('/vehicles/search', vehiclesController.search);

app.get('/vehicles/filters', vehiclesController.filters);

app.listen(8080, () => console.log('Vehicles API listening on port 8080!'));
