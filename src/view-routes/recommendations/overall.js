"use strict";
// routes to render the recommendation page

const recommendRoute = require('express').Router();

recommendRoute.get('/recommendations/overall', function (req, res) {
    res.render('recommendations_overall')
})

module.exports = recommendRoute;