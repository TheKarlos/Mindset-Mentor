"use strict";

const registerRoutes = require('express').Router();
const bcrypt = require('bcrypt');

registerRoutes.post('/register', function (req, res) {
    var registerForm = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
    global.serverDB.prepare("INSERT INTO `Users` (Name, Email, Password) VALUES (?,?,?)").run(registerForm.name, registerForm.email, bcrypt.hashSync(registerForm.password, 10));
    
    // login
    user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email = ?").get(registerForm.email);
    global.serverDB.prepare("INSERT INTO `Sessions` (SID, UID) VALUES (?,?)").run(req.session.id, user['UID']);

    registerResult.success = true;
    res.json(registerResult);
});

registerRoutes.get('/register', function (req, res) {
    res.render('register');
});

module.exports = registerRoutes;