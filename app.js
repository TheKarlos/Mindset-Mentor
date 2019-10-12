"use strict";
// app.js
//
// Entry point for the application

//-- LIBRARY INCLUDES

// database
const sqlite3 = require("better-sqlite3"); // database librarys

// express webserver + session
const express = require("express"); // expressJS third-party library, webserver
const bodyParser = require("body-parser"); // body-parser third-party middleware for expressJS, parse POST req body
const session = require('express-session')

// filesystem access
const fs = require("fs"); // inbuilt filesystem library for file I/O

//--

//-- GET CONFIG

global.config = require("./config.json");

//--

//-- INITIALISE WEBSERVER

// create https webserver
var app = express();

app.use(express.static('public')); // make assets available
app.use(bodyParser.urlencoded({
    extended: true
})); // use body-parser middleware to read form data
app.use(session({
    secret: 'health hackathon masters',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.set("view engine", "ejs"); // set express parser to ejs (embedded js)

app.listen(80); // create the server and listen to port 80
console.log("Server running at http://localhost:80");

//--

