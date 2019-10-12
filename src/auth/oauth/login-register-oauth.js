"use strict";

const { google } = require('googleapis');
const url = require('url');
const oauthRoutes = require('express').Router();

function peopleAPIRequest(token, callback) {
    const service = google.people({ version: 'v1', auth });
    service.people.get({
        resourceName: 'people/me',
        pageSize: 10,
        personFields: 'names,emailAddresses',
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        const person = res.data;
        if (person) {
            callback({ email: person.emailAddresses[0], name: person.names.join(' ') });
        }
    });
}

function getPersonDataFromOAuthCode(code, callback) {
    const auth_object = global.config["g_oauth"]["auth_object"];
    const oAuth2Client = new google.auth.OAuth2(
        auth_object["client_ID"], auth_object["client_secret"], auth_object["redirect"]);

    oAuth2Client.getToken(code, (err, token) => {
        oAuth2Client.setCredentials(token);
        peopleAPIRequest(token, callback);
    });
}

oauthRoutes.get('/login_oauth', function (req, res) {
    getPersonDataFromOAuthCode(req.query.code, (data) => {
        var user = global.serverDB.prepare("SELECT * FROM `Users` WHERE Email=?").get(data.email);
        if (user === undefined) {
            res.redirect(url.format({
                pathname: "/register",
                query: {
                    "name": data.name,
                    "email": data.email,
                    "googleauth": true
                }
            }));

            return;
        }

        global.serverDB.prepare("INSERT INTO `Sessions` (SID, UID) VALUES (?,?)").run(req.session.id, user["UID"]);

        res.redirect('/'); // back to home
    });
});

module.exports = oauthRoutes;