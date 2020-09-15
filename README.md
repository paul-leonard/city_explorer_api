# city_explorer_api
Lots of information about any city of your choosing!  The website displays information for a user defined city through aggregation of data via 6 APIs.


# City Explorer

**Author**: Paul Leonard
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
When traveling to a new city, or waking up in your home town, there is so much information you need for the day!  What's the weather going to be like?  Do you need a coat or umbrella?  What time do you need to get out of work to catch the new flick at the theatre?  Have any dinner plan ideas?

City Explorer brings answers to all of these questions and more with one simple stop!  Explore your or any other city just by entering the name and clicking Explore!

## Getting Started
1. Create a new repo on GitHub
1. Populate repo with base structure including gitignore, eslintrc, readme, and data files.
1. Create an express server
1. Deploy to Heroku
1. Get city of interest from the user using a route

## Architecture
This project develops a backend information gathering, management, and aggregation system to provide data to an existing front end interface called City Explorer.  The information is collected across 6 APIs and consolidated using object constructors.  The backend is written in JavaScript using Node.js.  Libraries used in this server include express, dotenv, and cors.


## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.
-->

09-14-2020 4:50pm - Created repo, populated file structure, set up server.js and supporting files (package.json; lock-package.json; .env).

09-14-2020 6:00pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
- Collaboration with Dominique Augurson

## Time Log

### Number and name of feature: 1-Repo Set-Up (and read instructions)

Estimate of time needed to complete: 1.5 hours

Start time: 3:15

Finish time: 4:50 not including heroku deploy after pushing and merging this

Actual time needed to complete: 1:35

### Number and name of feature: 2-Return Lat/Long object for city input

Estimate of time needed to complete: 1.0 hours

Start time: 5:15

Finish time: 6:00 not including heroku deploy after pushing and merging this

Actual time needed to complete: 0:45