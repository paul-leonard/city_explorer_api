'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

//Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// pull in json data
const weatherData = require('./data/weather.json');

// not sure why i put this in here, maybe from day 5 notes
// const { response } = require('express');



//Basic test of home page
app.get('/', (request, response) => {
  console.log('response body:', response);
  console.log('request method', request);
  response.send('hello world to explore');
})

// API Routes
app.get('/location', handleLocation);

// Helper Functions
function handleLocation(request, response) {
  try {
    const locationData = require('./data/location.json');
    const city = request.query.city;
    const cityData = new City(city, locationData);
    response.send(cityData);
  }
  catch (error) {
    console.log('ERROR',error);
    response.status(500).send('Deep apologies, something has gone wrong.');
  } 
}

function City(city,locationData) {
  this.search_query = city;
  this.formatted_query = locationData[0].display_name;
  this.latitude = locationData[0].lat;
  this.longitude = locationData[0].lon;
}



app.listen(PORT, ()=> {
  console.log('listening on port: ${PORT}');
  });