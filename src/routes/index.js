"use strict";
// routes to render the homepage

const indexRoute = require('express').Router();

indexRoute.get('/', function (req, res) {
    if(global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id)){
        res.redirect('/dashboard');
    }
    res.render('index');
})

module.exports = indexRoute;