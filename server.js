'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Require Application Dependencies - 3rd party from npm
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//Application Setup - assign file constants
const PORT = process.env.PORT;
const app = express();

// set up middleware - for global thigns happening in your app
app.use(cors());

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
    let city = request.query.city;
    let key = process.env.GEOCODE_API_KEY;

    let url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&limit=1&format=json`

    superagent.get(url)
      .then(incomingLocationData => {
        let locationData = incomingLocationData.body[0];
        const cityData = new City(city, locationData);
        response.send(cityData);
      })
      .catch( (error) => {
        response.status(500).send('Sorry, something went wrong');
      });
}

function City(city,locationData) {
  this.search_query = city;
  this.formatted_query = locationData.display_name;
  this.latitude = locationData.lat;
  this.longitude = locationData.lon;
};

function handleWeather(request, response) {
  let city = request.query.city;
  let lat = request.query.latitude;
  let long = request.query.longitude;
  let key = process.env.WEATHER_API_KEY;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&days=8&key=${key}`;

  superagent.get(url)
    .then(incomingWeatherData => {
      // can use json parsing to make diving into the response easier
      // response.json({data: incomingWeatherData});
      let weatherData = incomingWeatherData.body.data;
      const cityForecast = multiDayForecast(weatherData);
      response.send(cityForecast);
    })
    .catch( (error) => {
      response.status(500).send('Sorry, something went wrong');
    })
}

function multiDayForecast(weatherData) {
  return weatherData.map( (value) => {
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