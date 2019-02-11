var config = require('../../config');
var express = require('express');
var router = express.Router();
var helper = require('../../helper');
var mitCircumRepo = require('../../db/repository/mitigating-circumstances');
var userRepo = require('../../db/repository/user');
var fileUpload = require('../middlewares/file-upload')

/**
 * GET /mitigating-circumstances/
 *
 * Retrieve a list of mitigating circumstances linked to the user.
 */
router.get('/',
	helper.checkIfLoggedIn,
	function (req, res) {
		if (req.user.role == 'student') {
			mitCircumRepo.getMitigatingCircumstances(req.user.id, null, null, function (err, mCs, d) {
				res.json(mCs);
			});
		} else if (req.user.role == 'tutor') {
			mitCircumRepo.getMitigatingCircumstances(null, req.user.id, null, function (err, mCs, d) {
				res.json(mCs);
			});
		}
	});

/**
 * GET /mitigating-circumstances/
 *
 * Creates a new mitigating circumstance.
 */
router.post('/',
	helper.checkIfStudent,
	fileUpload.multer.single('file'),
	fileUpload.sendUploadToGCS,
	function (req, res) {
		let formData = JSON.parse(req.body.data);

		if (formData.circumstanceDetails == '' || formData.natureOfCircum == '') {
			return res.json({ error: { message: 'Mitigating circumstance not submitted. You havent filled the form out correctly' } })
		}
		var mitCircum = {
			student: {
				studentId: req.user.id,
				firstName: req.user.firstName,
				lastName: req.user.lastName,
			},
			circumstanceDetails: formData.circumstanceDetails,
			natureOfCircum: formData.natureOfCircum,
			status: [{
				name: 'PENDING',
				lastUpdated: Date.now(),
				message: 'Initial submit'
			}],
			tutorId: req.user.tutorId,
			files: []
		}

		// If a file was uploaded add it to the array
		if (req.file) {
			mitCircum.files.push({
				fileName: req.file.originalname,
				file: req.file.cloudStoragePublicUrl
			})
		}

		// Add the mitigating circumstance to the database
		mitCircumRepo.addMitigatingCircumstance(mitCircum, function (error) {
			if (error) {
				return res.json({ error: { message: error } })
			}

			userRepo.findUserAccount(null, req.user.tutorId, null, function (err, user) {
				// Send the tutor a text message alert stating a student has submitted a request
				helper.sendSMS(user.mobileNumber, 'Student ' + req.user.firstName + ' ' + req.user.lastName + ' has submitted a new mitigating circumstance request', function (error, response, body) {
					if (error) {
						return res.json({ error: { message: error } })
					}
				});
			})

			res.json({ success: { message: 'Sucessfully added your new mitigating circumstance' } })
		})
	});

/**
 * PUT /mitigating-circumstances/
 *
 * Updates a mitigating circumstance.
 */
router.put('/update',
	helper.checkIfTutor,
	function (req, res) {
		if (req.body.status == '') {
			return res.json({ error: { message: 'Mitigating circumstance not updated. You havent filled the form out correctly' } })
		}

		mitCircumRepo.getMitigatingCircumstances(null, null, req.body.id, function (error, mC, d) {
			if (error) {
				return res.json({ error: { message: error } })
			}

			// Add a new status to the mitigating circumstance
			mC[0].status.push({
				name: req.body.status,
				lastUpdated: Date.now(),
				message: req.body.updateMessage
			});

			// Update the mitigating circumstance in the database
			mitCircumRepo.updateMitigatingCircumstance(req.body.id, mC[0], function () {
				userRepo.findUserAccount(null, mC[0].student.studentId, null, function (err, user) {
					// Send the student a text stating its been updated
					helper.sendSMS(user.mobileNumber, 'Hi, your mitigating circumstance status has been updated', function (error, response, body) {
						if (error) {
							return res.json({ error: { message: error } })
						}
					});
				})
				res.json({ success: { message: 'Sucessfully updated mitigating circumstance' } })
			})
		});
	});

module.exports = router;