"use strict";

const registerRoutes = require('express').Router();

registerRoutes.post('/register', function (req, res) {
    var registerForm = {
        name = req.body.name,
        gender = req.body.gender,
        DOB = req.body.DOB,
        email = req.body.email,
        password = req.body.password,
        metrics = req.body.metrics,
        likes = req.body.likes
    }

    var registerResult = {
        success: false,
        message: ""
    }

    // check existing email
    var user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email = ?").get(registerForm.email);
    if (user) {
        registerResult.message = "User already exists!";
        res.json(registerResult);
        return;
    }

    // insert data
    global.serverDB.prepare("INSERT INTO `Users` (Name, Email, Password) VALUES (?,?,?)").run(registerForm.name, registerForm.email, registerForm.password);

    // insert profile
    user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email = ?").get(registerForm.email);
    global.serverDB.prepare("INSERT INTO `Profile` (UID, Gender, DOB, Metrics, Likes) VALUES (?,?,?,?,?)").run(user["UID"], registerForm.gender, registerForm.DOB, registerForm.metrics, registerForm.likes);

    registerResult.success = true;
    res.json(registerResult);
});

registerRoutes.get('/register', function (req, res) {
    res.render('register', { oauth: req.query.googleauth, name: req.query.name, email: req.query.email });
});

module.exports = registerRoutes;