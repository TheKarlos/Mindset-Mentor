"use strict";
// routes to render the recommendation page

const dashboardRoute = require('express').Router();
const params = ["Happiness","Sociability","Activeness","Productivity","StressAnxiety","Sleep"]
const traitSuggestions = {
    "Happiness": ["Open up to a friend about how you're feeling", "Try calling Nightline to talk about any problems", "Go to your local support group at Leeds Church"],
    "Sociability": ["Try to join a new club this week", "Text a friend you've lost touch with", "Go to the local football team"],
    "Activeness": ["Go for a jog today", "Try visiting the gym", "Play some football later"],
    "Productivity": ["Find a personal subject mentor", "Talk to your teacher about any problems", "Create a daily schedule"],
    "StressAnxiety": ["Test", "Test", "Test"],
    "Sleep": ["Test", "Test", "Test"]
}

dashboardRoute.get('/dashboard', function (req, res) {
    var session = global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id);
    var profile = global.serverDB.prepare("SELECT * FROM `Profile` WHERE UID=?").get(session["UID"]);
    var traitTitle = req.query.trait;
    if(!req.query.trait){
        res.redirect('/dashboard?trait=Sociability');
    }
    if(req.query.trait === "StressAnxiety"){
        traitTitle = "Stress/Anxiety"
    }
    if(!profile || profile === undefined){
        res.redirect('/setup');
        return;
    }

    res.render('recommendations_overall', {
        traitTitle: traitTitle,
        traitData: profile[req.query.trait],
        traitSuggestions:  traitSuggestions[req.query.trait]
    })
})

module.exports = dashboardRoute;