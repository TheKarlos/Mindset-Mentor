"use strict";

const setupRoutes = require('express').Router();

setupRoutes.get("/setup", function(req, res){
    res.render('setup');
})

setupRoutes.post("/setup", function(req, res){
    var setupData = {
        DOB: req.body.DOB,
        Gender: req.body.genderSelect,
        Problems: req.body["problem-list"],
        Likes: req.body["likes-list"]
    }

    var session = global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id);

    global.serverDB.prepare("INSERT INTO `Profile` (UID, Gender, DOB) VALUES (?,?,?)").run(session["UID"],setupData.Gender,setupData.DOB); // TODO: initial setup later
    res.json({success: true});
})

module.exports = setupRoutes;