# city_explorer_api
Lots of information about any city of your choosing!  The website displays information for a user defined city through aggregation of data via 6 APIs.


# City Explorer

**Author**: Paul Leonard
**Version**: 1.1.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
When traveling to a new city, or waking up in your home town, there is so much information you need for the day!  What's the weather going to be like?  Do you need a coat or umbrella?  What time do you need to get out of work to catch the new flick at the theatre?  Have any dinner plan ideas?

City Explorer brings answers to all of these questions and more with one simple stop!  Explore your or any other city just by entering the name and clicking Explore!

## Getting Started
1. Create a new repo on GitHub
1. Populate repo with base structure including gitignore, eslintrc, readme, and data files.
1. Create an express server
1. Deploy to Heroku
1. Get city of interest from the user using a route
1. Define routes and actions to take for given routes
1. Injest data from JSON files
1. Restructure data appropriately to format expected by client
1. Protect for mishaps with try/catch and error codes


## Architecture
This project develops a backend information gathering, management, and aggregation system to provide data to an existing front end interface called City Explorer.  The information is collected across 6 APIs and consolidated using object constructors.  The backend is written in JavaScript using Node.js.  Libraries used in this server include express, dotenv, and cors.


## Change Log
09-14-2020 4:50pm - Created repo, populated file structure, set up server.js and supporting files (package.json; lock-package.json; .env).

09-14-2020 6:00pm - Application now has a fully-functional express server, with a GET route for the location resource.

09-14-2020 10:55pm - Weather and date now returns.

09-14-2020 11:05pm - Error codes in place.

**1.1.0** 09-15-2020 4:45pm - Refactored weather handler to use .map.

**1.2.0** 09-15-2020 6:15pm - Connect to real location API

**1.3.0**  09-15-2020 x:xxpm - Connect real weather API

**2.0.0**  09-15-2020 1:50am - Added trail, location, weather API to provide real data

**2.1.0**  09-16-2020 12:08am - Added SQL server support and table


## Credits and Collaborations
- Collaboration with Dominique Augurson
- [Converting Date String to DATE Object](https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript/5619263)
- [Method to Create Date String in Format Desired](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString)
- [How to refer to an object's parameter without dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)


## Time Log

### Number and name of feature: 1-Repo Set-Up (and read instructions)

Estimate of time needed to complete: 1.5 hours

Start time: 3:15

Finish time: 4:50 not including heroku deploy after pushing and merging this

Actual time needed to complete: 1:35

### Number and name of feature: 2-Return Lat/Long object for city input

Estimate of time needed to complete: 1.0 hours

Start time: 5:15

Finish time: 6:35

Actual time needed to complete: 1:20

### Number and name of feature: 3-Return Lat/Long object for city input

Estimate of time needed to complete: 45 minutes

Start time: 6:35

Finish time: 10:55 with probably an hour break

Actual time needed to complete: 3 hours and 20 minutes

### Number and name of feature: 4-Return Lat/Long object for city input

Estimate of time needed to complete: 30 minutes

Start time: 10:55

Finish time: 11:10

Actual time needed to complete: 15 minutes

### Number and name of feature: Lab7 Feature 1 - Refactor weather to use .map

Estimate of time needed to complete: 30 minutes

Start time: 3:40

Finish time: 4:48

Actual time needed to complete: 1:08

### Number and name of feature: Lab7 Feature 2 - Connect to real location API

Estimate of time needed to complete: 1.5 hours

Start time: 5:00

Finish time: 6:16 with 15 minute break

Actual time needed to complete: 1 hour and 1 minute

### Number and name of feature: Lab7 Feature 3 - Connect to real weather API

Estimate of time needed to complete: 1 hour

Start time: 6:50
Breaks:  10 minutes; 1-2 hour break; 
Finish time: 10:40

Actual time needed to complete: about 2 hours

## Number and name of feature: Lab7 Feature 4 - Connect to trails API

Estimate of time needed to complete: 1 hour

Start time:  12:55

Finish time: 1:48 plus hopefully only ten minutes to deploy to heroku and test

Actual time needed to complete: 1:05


## Number and name of feature: Lab8 Feature 1 - Set up repo for SQL tables and make one

Estimate of time needed to complete: 1 hour

Start time:  10:40

Finish time: 12:10

Actual time needed to complete: 1:30

## Number and name of feature: Lab8 Feature 2 - check DB for city and add city to DB

Estimate of time needed to complete: 1.5 hours

Start time:  12:10 ; 11:30

Finish time: 1:05 ; 2:00

Actual time needed to complete: 3:25

## Number and name of feature: Lab8 Feature 3 - deploy application including postgres DB to heroku

Estimate of time needed to complete: 30 minutes

Start time:  2:11

Finish time: 

Actual time needed to complete: 