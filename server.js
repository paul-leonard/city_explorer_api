'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Require Application Dependencies - 3rd party from npm
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const { response } = require('express');

//Application Setup - assign file constants
const PORT = process.env.PORT;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => console.error(err));
// Thanks to Chance for the error log above to help with troubleshooting


// set up middleware - for global thigns happening in your app
app.use(cors());

//Basic test of home page
app.get('/', (request, response) => {
  response.send('hello world to explore');
})

// API Routes
app.get(`/location`, handleLocation);
app.get(`/weather`, handleWeather);
app.get('/trails', handleTrails);
app.get('*', notFoundHandler);




// Helper Functions  ---------------------------------  Helper Functions  --------------------------------- 

function handleLocation(request, response) {
  // what city is the user looking for?
  let city = request.query.city;
    
  // run a select from the locations table to see if we have this city already stored
  const searchSQL = 'SELECT * FROM locations WHERE search_query=$1';
  const safeSearchCityValues = [city];

  // get the results
  client.query(searchSQL,safeSearchCityValues)
    .then(incomingFromSQL => {
      // once connected, use the next line to see what SQL returns raw
      // res.status(200).json(results.rows);
      // for final code, run the results through the constructor to make good data

      //if results are good data, pass them to client
      if(incomingFromSQL.rowCount){
        const chosenCityFromDB = incomingFromSQL.rows[0];
        let thisCity = new CityFromSQL(chosenCityFromDB.search_query,chosenCityFromDB.formatted_query,chosenCityFromDB.latitude,chosenCityFromDB.longitude);
        console.log('found the city in the database');
        console.log(`this city results object: `, thisCity);
        response.status(200).send(thisCity);
      }    // tricky if/else. Morgan suggested, similar to reading last night. If true, sends response and exits the whole function. So nothing below it would be run,        meaning an else statement and block is not needed.
      
      // if there is no data in the DB for this city, go get the info from the API
      console.log('did not find city in DB - going to the API')


      // had put below response in to test connectivity... but it didn't work. ....actually
      // actually... turns out it did respond with the message... but also a warning  aboutunhandled   promise rejection
      // will get TA help tomorrow to get it all connected
      // res.status(200).json({ message: 'ok' })

      let url = `https://us1.locationiq.com/v1/search.php`
      const queryObject = {
        key: process.env.GEOCODE_API_KEY,
        city,
        format: 'JSON',
        limit: 1
      }

      superagent
      .get(url)
      .query(queryObject)
        .then(incomingLocationData => {
          let locationData = incomingLocationData.body[0];
          const cityData = new City(city, locationData);
          addToLocationDatabase(cityData);
          response.send(cityData);
        })
        .catch( (error) => {
          response.status(500).send('Sorry, something went wrong');
        });
    })
    .catch(e => {
      throw new Error(e.message)
    });
}





  
function addToLocationDatabase(cityObject) {
  //add new search_query AND its object to database
  const storeInDBsql = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);`;
  const safeInputCityValues = [cityObject.city, cityObject.formatted_query, cityObject.latitude, cityObject.longitude];
  console.log(`safe values for location: `, safeInputCityValues);
  client.query(sql, safeValues);
}

function City(city,locationData) {
  this.search_query = city;
  this.formatted_query = locationData.display_name;
  this.latitude = locationData.lat;
  this.longitude = locationData.lon;
};

function CityFromSQL(search_query,formatted_query,latitude,longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
};

function handleWeather(request, response) {
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

function handleTrails(request, response) {
  let lat = request.query.latitude;
  let long = request.query.longitude;  
  let key = process.env.TRAIL_API_KEY;

  let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=60&key=${key}&sort=quality`;

  superagent.get(url)
    .then(incomingTrailsData => {
      let trailsData = incomingTrailsData.body.trails;   
      const allTrailData = trailsData.map( (value) => new Trail(value));
      response.send(allTrailData);
    })
    .catch( (error) => {
      response.status(500).send('Sorry, something went wrong');
    });
}

function Trail(trailData) {
this.name = trailData.name;
this.location = trailData.location;
this.length = trailData.length;
this.stars = trailData.stars;
this.star_votes = trailData.starVotes;
this.summary = trailData.summary;
this.trail_url = trailData.url;
this.conditions = trailData.conditonDetails;
this.condition_date = trailData.conditionDate.slice(0,10);
this.condition_time = trailData.conditionDate.slice(11,19);
};

function notFoundHandler(request, response) {
  response.status(404).send('That page does not exist. Should we make it?')
}

function startServer() {
  app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);
    });
}

client.connect()
  .then(startServer)
  .catch(e => console.log(e));

