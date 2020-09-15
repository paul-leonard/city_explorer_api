'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
// const { response } = require('express');

//Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// not sure why i put this in here, maybe from day 5 notes
// const { response } = require('express');

//Basic test of home page
app.get('/', (request, response) => {
  response.send('hello world to explore');
})

// API Routes
app.get(`/location`, handleLocation);
app.get(`/weather`, handleWeather);
app.get('*', notFoundHandler);

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
    response.status(500).send('Sorry, something went wrong');
  } 
}

function City(city,locationData) {
  this.search_query = city;
  this.formatted_query = locationData[0].display_name;
  this.latitude = locationData[0].lat;
  this.longitude = locationData[0].lon;
};

function handleWeather(request, response) {
  try {
    const weatherData = require('./data/weather.json');
    const city = request.query.city;
    const cityForecast = multiDayForecast(city, weatherData);
    response.send(cityForecast);

    const cityForecast = weatherData.data.map(new Forecast(city,weatherData,i))    

    response.send(cityForecast);
  }
  catch(error) {
    console.log('ERROR',error);
    response.status(500).send('Sorry, something went wrong');
  }
}

function multiDayForecast(city,weatherData) {
  return weatherData['data'].map( (value,index) => {
    return new Forecast(value.weather.description, value.datetime);
  });
}

function Forecast(desc,day) {
  this.forecast = desc;
  let dateString = day;
  this.time = new Date(dateString).toDateString();
}

function notFoundHandler(request, response) {
  response.status(404).send('That page does not exist. Should we make it?')
}

app.listen(PORT, ()=> {
  console.log(`listening on port: ${PORT}`);
  });