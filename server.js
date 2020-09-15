'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const locationData = require('./data/location.json');
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
  console.log('listening on port: ${PORT}');
  });

