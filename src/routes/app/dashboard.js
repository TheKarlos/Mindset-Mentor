"use strict";
// routes to render the recommendation page

const dashboardRoute = require('express').Router();

dashboardRoute.get('/dashboard', function (req, res) {
    res.render('recommendations_overall')
})

module.exports = dashboardRoute;