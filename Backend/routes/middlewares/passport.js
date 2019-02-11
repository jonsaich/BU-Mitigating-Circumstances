var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const datastore = require('../../db/cloud-datastore');
var helper = require('../../helper');
var userRepo = require('../../db/repository/user');
var userModel = require('../../db/models/UserModel');
var config = require('../../config')

passport.serializeUser(function (user, done) {
    done(null, user[datastore.KEY].id);
});

passport.deserializeUser(function (id, done) {
    userRepo.findUserAccount(null, id, null, function (err, account, key) {
        done(null, account);
    });
});

passport.use(new FacebookStrategy({
    passReqToCallback: true,
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.apiUrl + "/user/callback",
    profileFields: ['email', 'feed', 'first_name', 'gender', 'last_name', 'picture']
}, function (req, accessToken, refreshToken, profile, done) {
    userRepo.findUserAccount(profile._json.email, null, null, function (err, account, key) {
        if (err) { return done(err); }
        if (!account) {
            // No account found - create account
            var user = {
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                email: profile._json.email,
                facebookId: profile._json.id,
                twitterId: '',
                mobileNumber: '',
                // Allocate a random tutor
                tutorId: config.tutorIds[Math.floor(Math.random() * config.tutorIds.length)],
                role: 'student'
            };

            userRepo.addUserAccount(user, function (err) {
                if (err) { console.log(err) }
                else {
                    userRepo.findUserAccount(profile._json.email, null, null, function (err, account, key) {
                        done(null, account);
                    });
                }
            });
        } else {
            done(null, account);
        }
    });
}));

passport.use(new LocalStrategy(
    function (email, password, done) {
        userRepo.findUserAccount(email, null, null, function (err, account, key) {
            if (err) { return done(err); }
            if (!account) { return done(null, false); }

            helper.checkPassword(password, account.password, function (res) {
                if (res == true) {
                    return done(null, account);
                } else {
                    return done(null, false);
                }
            })
        });
    }
));

module.exports = {
    passport
}