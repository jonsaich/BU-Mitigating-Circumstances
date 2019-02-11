const { check, validationResult } = require('express-validator/check');

var userValidation = [
	check('firstName')
		.not().isEmpty().withMessage('The first name is required'),
	check('lastName')
		.not().isEmpty().withMessage('The last name is required'),
	check('email')
		.not().isEmpty().withMessage('The email is required')
		.isEmail().withMessage('Must be a valid email'),
	check('password')
		.isLength({ min: 5 })
		.custom(function(value,{req, loc, path}) {
			if (value !== req.body.confirmPassword) {
				throw new Error("Passwords don't match");
			} else {
				return value;
			}
		}),

	function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
	}	
]


function user(userData) {
	return {
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,		
		password: userData.password,
		facebookId: userData.facebookId
	};
}

exports.userValidation = userValidation;
exports.user = user;