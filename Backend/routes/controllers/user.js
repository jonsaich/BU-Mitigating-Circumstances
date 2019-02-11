var config = require('../../config');
var express = require('express');
var router = express.Router();
var userRepo = require('../../db/repository/user');
var userModel = require('../../db/models/UserModel');
var helper = require('../../helper');
const { check, validationResult } = require('express-validator/check');
var passport = require('../middlewares/passport');

/**
 * POST /user/register/local
 *
 * Adds a new user to the database.
 */
router.post('/register/local',
	userModel.userValidation,
	function (req, res) {
		// Encrypt the users password
		helper.encryptPassword(req.body.password, function (error, hash) {
			if (error) {
				return res.json({ error: error })
			}

			var user = userModel.user({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash,
				twitterId: '',
				mobileNumber: '',
				// Allocate a random tutor
				tutorId: config.tutorIds[Math.floor(Math.random() * config.tutorIds.length)]
			});

			// Add the user to the database
			userRepo.addUserAccount(user, function (error) {
				if (error) {
					return res.json({ error: error });
				}

				return res.json({ success: { message: 'Sucessfully updated' } });
			});
		});
	}
);

/**
 * POST /user/login/local
 *
 * Logs a user in.
 */
router.post('/login/local', function (req, res, next) {
	passport.passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.json({error: {message: 'Your email and/or password is incorrect'}}); }
		req.logIn(user, function (err) {
			if (err) { return next(err); }
			return res.json({ success: { user: req.user } });
		});
	})(req, res, next)
});

/**
 * GET /user/login/facebook
 *
 * Logs a user in using facebook OAuth.
 */
router.get('/login/facebook',
	function (req, res, next) {
		req.session.returnUrl = req.query.returnUrl;
		next();
	},
	passport.passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] })
);

router.get('/callback',
	passport.passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }),
	function (req, res) {
		if (req.session.returnUrl) {
			res.redirect(req.session.returnUrl);
		} else {
			res.json(req.user);
		}
	});

/**
 * GET /user/logout
 *
 * Logs the user out and destroys their session
 */
router.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		res.json({ success: { message: 'Sucessfully logged out' } })
	});
});

/**
 * PUT /user/
 *
 * Updates the users account
 */
router.put('/',
	helper.checkIfLoggedIn,
	function (req, res) {
		userRepo.findUserAccount(null, req.user.id, null, function (error, user, d) {
			if (error) {
				return res.json({ error: {message: error} })
			}

			// Update the fields
			user.twitterId = req.body.twitterId;
			user.mobileNumber = req.body.mobileNumber;

			// Update the mitigating circumstance in the database
			userRepo.updateUser(req.user.id, user, function () {
				res.json({ success: { message: 'Sucessfully updated your account details' } })
			})
		});
	});

module.exports = router;