var bcrypt = require('bcrypt');
var saltRounds = 10;
var request = require('request');
var config = require('./config');

var helper = {
    encryptPassword: function (plaintextPassword, callback) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(plaintextPassword, salt, function (err, hash) {
                return callback(err, hash);
            });
        });
    },
    checkPassword: function (plaintextPassword, hash, callback) {
        bcrypt.compare(plaintextPassword, hash, function (err, res) {
            console.log(plaintextPassword + ' ' + hash);
            console.log(res);
            return callback(res);
        });
    },
    checkIfLoggedIn: function (req, res, next) {
        console.log(req.user)
        if (!req.user) {
            res.json({ role: 'guest' })
        } else {
            next();
        }
    },
    checkIfTutor: function (req, res, next) {
        if (req.user != null && req.user.role != 'tutor') {
            res.json({ error: 'You must be a tutor to use this' })
        } else {
            next();
        }
    },
    checkIfStudent: function (req, res, next) {
        if (req.user != null && req.user.role != 'student') {
            res.json({ error: 'You must be a student to use this' })
        } else {
            next();
        }
    },
    sendSMS: function (to, body, cb) {
        request.post('https://api.twilio.com/2010-04-01/Accounts/'+config.twilio.auth.username+'/Messages.json', {
            auth: { 'user': config.twilio.auth.username, 'pass': config.twilio.auth.password, 'sendImmediately': true },
            form: { From: config.twilio.fromNumber, To: to, Body: body }
        },
            function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                cb(error, response, body);
            });
    },
    twitterAPI: function(type, url, body, cb) {
        oauth =
        { consumer_key: config.twitter.consumerKey
        , consumer_secret: config.twitter.consumerSecret
        , token: config.twitter.accessToken
        , token_secret: config.twitter.tokenSeret
        }

        if(type == 'POST') {
            request.post({url: url, oauth:oauth, headers: {'Content-Type': 'application/json'}, json:true, body: body}, function (error, r, resBody) {
                cb(error, resBody)
            })
        } else if(type == 'DELETE') {
            request.delete({url: url, oauth:oauth, json:true}, function (error, r, resBody) {
                cb(error, resBody)
            })
        }else {
            request.get({url: url, oauth:oauth, json:true, form: body}, function (error, r, resBody) {
                cb(error, resBody)
            })
        }
    }
}

module.exports = helper;