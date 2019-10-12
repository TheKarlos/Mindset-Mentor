"use strict";
// routes to render the planner page

const plannerRoute = require('express').Router();

plannerRoute.get('/planner', function(req, res){
    res.render('planner')
})

module.exports = plannerRoute;