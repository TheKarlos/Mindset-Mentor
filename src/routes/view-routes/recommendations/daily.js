"use strict";
// routes to render the recommendation page

const recommendRoute = require('express').Router();

recommendRoute.get('/recommendations/daily', function (req, res) {
    res.render('recommendations_daily')
})

module.exports = recommendRoute;