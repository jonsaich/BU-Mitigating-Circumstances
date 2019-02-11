var twitterRepo = require('./db/repository/twitter')
var helper = require('./helper');
var userRepo = require('./db/repository/user')
var mitCirtRepo = require('./db/repository/mitigating-circumstances')
var config = require('./config');

function addMitsFromTwitter(dMs) {
  dMs.forEach(function (dM) {
    if (dM.senderId != config.twitter.accountId) {
      // See if the user who sent is linked to an account
      userRepo.findUserAccount(null, null, dM.senderId, function (err, user, d) {
        if (user) {
          if (dM.message.includes('CIRCUMSTANCE DETAILS:') && dM.message.includes('NATURE OF CIRCUMSTANCE:')) {
            var formattedMessage = dM.message.replace(/ +/g, " ").split('CIRCUMSTANCE DETAILS:');
            var circumstanceDetails = formattedMessage[1].trim();
            var natureOfCircum = formattedMessage[0].split('NATURE OF CIRCUMSTANCE:').pop().trim();

            if (config.twitter.validNatureOfCircumstance.includes(natureOfCircum)) {
              mitCirtRepo.addMitigatingCircumstance({
                natureOfCircum: natureOfCircum,
                circumstanceDetails: circumstanceDetails,
                tutorId: user.tutorId,
                status: [{
                  message: "Initial submit",
                  lastUpdated: Date.now(),
                  name: "PENDING"
                }],
                student: {
                  firstName: user.firstName,
                  studentId: user.id,
                  lastName: user.lastName
                }
              }, function (err) {
                if (err) {
                  // TODO: ERRR

                }

                helper.sendSMS(config.smsNumber, config.messages.addedMitigatingCircumstanceText, function () {
                });

                var errorMsg = "Added :)";
                helper.twitterAPI('POST', 'https://api.twitter.com/1.1/direct_messages/events/new.json', { event: { type: 'message_create', message_create: { target: { recipient_id: dM.senderId }, message_data: { text: errorMsg } } } }, function (error, resBody) {
                  console.log(resBody)
                });
              })
            } else {
              var errorMsg = "You need to supply a valid NATURE OF CIRCUMSTANCE, please choose from: \n \n Illness \n Family Illness \n Pregnancy related illness \n Bereavement \n Unforeseen travel disruption \n Acute Personal difficulties ";
              helper.twitterAPI('POST', 'https://api.twitter.com/1.1/direct_messages/events/new.json', { event: { type: 'message_create', message_create: { target: { recipient_id: dM.senderId }, message_data: { text: errorMsg } } } }, function (error, resBody) {
                console.log(resBody)
              });
            }
          } else {
            // Send message back to user saying wrong format....
            var errorMsg = "Hello, \n \n To make a new mitigating circumstance request please use the following format. \n \n NATURE OF CIRCUMSTANCE: \n Illness \n Family Illness \n Pregnancy related illness \n Bereavement \n Unforeseen travel disruption \n Acute Personal difficulties \n \n CIRCUMSTANCE DETAILS: \n Your details here... "
            helper.twitterAPI('POST', 'https://api.twitter.com/1.1/direct_messages/events/new.json', { event: { type: 'message_create', message_create: { target: { recipient_id: dM.senderId }, message_data: { text: errorMsg } } } }, function (error, resBody) {
              console.log(resBody)
            });
          }
        }
        else {
          // Couldn't find account in our db....
          var errorMsg = "Your Twitter account isn't linked to our system - please add it.";
          helper.twitterAPI('POST', 'https://api.twitter.com/1.1/direct_messages/events/new.json', { event: { type: 'message_create', message_create: { target: { recipient_id: dM.senderId }, message_data: { text: errorMsg } } } }, function (error, resBody) {
            console.log(resBody)
          });
        }
      })
    }
  })
}

function submitMitFromTwitter() {
  // Get recent messages
  helper.twitterAPI(null, 'https://api.twitter.com/1.1/direct_messages/events/list.json', {}, function (error, resBody) {
    // First we get the most recent DM
    twitterRepo.getMostRecentDM(function (err, dM, d) {
      var mostRecentDMInDb = (dM == null ? 0 : dM.created_timestamp);
      var dMs = [];
      if (resBody.events != null) {
        // Find the new DMs which we need to add to the db
        resBody.events.forEach(function (dm) {
          if (dm.created_timestamp > mostRecentDMInDb) {
            dMs.push({ created_timestamp: dm.created_timestamp, message: dm.message_create.message_data.text, senderId: dm.message_create.sender_id });
          }
        });

        // If there are any new DMs we will now work
        if (dMs.length != 0) {
          // Add messages to the database
          twitterRepo.addDMs(dMs, function (err) {

          });

          // Add new mitigating circumstances to system
          addMitsFromTwitter(dMs)
        }
      }
    })
  });
}

module.exports = submitMitFromTwitter;