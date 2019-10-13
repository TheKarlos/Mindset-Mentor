"use strict";

const aboutRoute = require('express').Router();

aboutRoute.get('/about', function (req, res) {
    res.render('about');
})

module.exports = aboutRoute;