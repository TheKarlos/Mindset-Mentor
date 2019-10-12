"use strict";

const { google } = require('googleapis');
const url = require('url');
const oauthRoutes = require('express').Router();

function peopleAPIRequest(auth, callback) {
    const service = google.people({ version: 'v1', auth });
    service.people.get({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses',
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        const person = res.data;
        console.log(person.names);
        if (person) {
            callback({ email: person.emailAddresses[0].value, name: person.names[0].displayName.toString() });
        }
    });
}

function getPersonDataFromOAuthCode(code, callback) {
    global.oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        global.oAuth2Client.setCredentials(token);
        peopleAPIRequest(global.oAuth2Client, callback);
    });
}

oauthRoutes.get('/login_oauth', function (req, res) {
    getPersonDataFromOAuthCode(req.query.code, (data) => {
        var user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email=?").get(data.email);
        if (user === undefined) {
            global.serverDB.prepare("INSERT INTO `Users` (Name, Email, Password) VALUES (?,?,?)").run(data.name, data.email, data.password);
            user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email=?").get(data.email);
        }

        global.serverDB.prepare("INSERT INTO `Sessions` (SID, UID) VALUES (?,?)").run(req.session.id, user["UID"]);

        res.redirect('/dashboard'); // back to home
    });
});

module.exports = oauthRoutes;