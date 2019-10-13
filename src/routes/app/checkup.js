"use strict";

const checkupRoute = require('express').Router();

//screw it at this point just hardcode
const questions = ["Rate your happiness today!","Rate your social experience!","Rate your level of physical activity!","Rate your productivity!","Compare your stress to yesterday...","Compare your sleep to yesterday..."]
const deltas = ["HappinessDelta","SociabilityDelta","ActivenessDelta","ProductivityDelta","StressAnxietyDelta","SleepDelta"]
const params = ["Happiness","Sociability","Activeness","Productivity","StressAnxiety","Sleep"]
checkupRoute.post('/checkup', function (req, res) {
    req.session.checkupIdx += 1;
    res.render('quiz_question', {questionTitle: questions[req.session.checkupIdx]});
})

checkupRoute.get('/checkup', function (req, res) {
    var session = global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id);
    if(req.query.delta){
        global.serverDB.prepare(`INSERT INTO \`DailyEntries\` (UID, Date, ${deltas[req.session.checkupIdx]}) VALUES (?,?,?)`).run(session["UID"],Math.floor(new Date() / 1000),req.query.delta);
        global.serverDB.prepare(`UPDATE \`Profile\` SET \`${params[req.session.checkupIdx]}\` = \`${params[req.session.checkupIdx]}\` + ? WHERE UID = ?`).run(req.query.delta, session["UID"]);
        req.session.checkupIdx += 1;
    }
    if(req.session.checkupIdx === undefined )
        req.session.checkupIdx = 0;
    
    if(req.session.checkupIdx == 6){
        res.redirect('/recommendations/daily');
        return;
    }
    res.render('quiz_question', {questionTitle: questions[req.session.checkupIdx]});
})

module.exports = checkupRoute;