"use strict";
// routes to render the recommendation page

const dashboardRoute = require('express').Router();

dashboardRoute.get('/dashboard', function (req, res) {
    var session = global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id);
    var profile = global.serverDB.prepare("SELECT * FROM `Profile` WHERE UID=?").get(session["UID"]);

    if(!profile || profile === undefined){
        res.redirect('/setup');
        return;
    }

    res.render('recommendations_overall')
})

module.exports = dashboardRoute;