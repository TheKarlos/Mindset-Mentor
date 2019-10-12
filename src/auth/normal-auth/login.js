"use strict";
// login.js
//
// Login routes for the webapp

const crypto = require('crypto');
const loginRoute = require('express').Router();

// serve webpage
loginRoute.get('/login', function(req, res){
    res.render('login'); // TODO: get actual name later
});

// handle login request
loginRoute.post('/login', function(req, res){
    var formData = {
        email = req.body.email,
        password = req.body.password
    }

    var loginResult = {
        success: false,
        message: ''
    }

    // match with DB
    var row = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email=? AND Password=?").get(formData.email, formData.password);
    if(!row || row === undefined){
        loginResult.message = "Invalid credentials!";
        res.json(loginResult);
        return;
    }

    // enter session ID into DB
    global.serverDB.prepare("INSERT INTO `Sessions` (SID, UID) VALUES (?,?)").run(req.session.id, row['UID']);

    // success
    res.success = true;
    res.json(loginResult);
});

module.exports = loginRoute;