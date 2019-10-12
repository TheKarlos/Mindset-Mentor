"use strict";
// routes to render the homepage

const indexRoute = require('express').Router();

indexRoute.get('/', function (req, res) {
    res.render('index')
})

module.exports = indexRoute;