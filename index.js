require('dotenv').load();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const vehiclesController = require('./controllers/vehicles_controller');

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Use /vehicles/search or /vehicles/filters'));

app.get('/vehicles/search', vehiclesController.search);

app.get('/vehicles/filters', vehiclesController.filters);

app.listen(process.env.APP_PORT, () => console.log(`Vehicles API listening on port ${process.env.APP_PORT}!`));
