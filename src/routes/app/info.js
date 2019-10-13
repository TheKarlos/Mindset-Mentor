"use strict";
// routes to render the planner page

const infoRoute = require('express').Router();

infoRoute.get('/info/stress_anxiety', function(req, res){
    res.render('info_stress_anxiety')
})

module.exports = infoRoute;