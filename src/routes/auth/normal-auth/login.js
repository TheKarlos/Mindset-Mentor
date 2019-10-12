"use strict";
// login.js
//
// Login routes for the webapp

const crypto = require('crypto');
const loginRoute = require('express').Router();
const { google } = require('googleapis');
const bcrypt = require('bcrypt');

// serve webpage
loginRoute.get('/login', function(req, res){
    const authUrl = global.oAuth2Client.generateAuthUrl({
        access_type: 'online',
        scope: global.config["g_oauth"]["scopes"]
      });

    res.render('login', {googleAuthUrl: authUrl});
});

// handle login request
loginRoute.post('/login', function(req, res){
    var formData = {
        email: req.body.email,
        password: req.body.password
    }

    var loginResult = {
        success: false,
        message: ''
    }

    // match with DB
    var row = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email=?").get(formData.email);
    if(!row || row === undefined || row["Password"] == "" || formData.password == "" || !bcrypt.compareSync(formData.password, row["Password"])){
        loginResult.message = "Invalid credentials!";
        res.json(loginResult);
        return;
    }

    // enter session ID into DB
    global.serverDB.prepare("INSERT INTO `Sessions` (SID, UID) VALUES (?,?)").run(req.session.id, row['UID']);

    // success
    loginResult.success = true;
    res.json(loginResult);
});

module.exports = loginRoute;