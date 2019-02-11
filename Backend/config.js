var config = {};

config.google_cloud = {};
config.facebook = {};
config.tutorIds = []
config.twilio = {}
config.twitter = {}
config.messages = {}

// Google Cloud 
config.google_cloud.project_id = 'bu-mitigating-circumstances';
config.google_cloud.bucket_id = 'bu-mit-files';

config.apiUrl = (process.env.PORT ? 'https://api-dot-bu-mitigating-circumstances.appspot.com' : 'https://localhost:3001')

// Messages
config.messages.addedMitigatingCircumstanceText = 'Uploaded a new one'

// SMS number
config.smsNumber = ''

// Tutor ids
config.tutorIds.push("5707090131681280")

// Twilio
config.twilio.auth = {username: '', password: ''}
config.twilio.fromNumber = ''

// Twitter
config.twitter.accountId = ''
config.twitter.consumerKey = ''
config.twitter.consumerSecret = ''

config.twitter.accessToken = ''
config.twitter.tokenSeret = ''
config.twitter.validNatureOfCircumstance = ['Illness', 'Family Ilness', 'Pregnancy related illness', 'Bereavement', 'Unforeseen travel disruption', 'Acute Personal difficulties']

// Facebook
config.facebook.clientID = ''
config.facebook.clientSecret = ''

module.exports = config;