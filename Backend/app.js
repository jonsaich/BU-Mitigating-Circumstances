var express = require('express');
const https = require('https');
const fs = require('fs');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser')
const cors = require('cors')
var helper = require('./helper');
var session = require("express-session");
var passport = require('./routes/middlewares/passport');
const Datastore = require('@google-cloud/datastore');
const DatastoreStore = require('@google-cloud/connect-datastore')(session);
var twitter = require('./twitter');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
	store: new DatastoreStore({
		dataset: Datastore({
			kind: 'express-sessions',
			projectId: config.google_cloud.project_id,
		})
	}),
	secret: 'my-secret'
}));

app.use(cors({ credentials: true, origin:(process.env.PORT ? 'https://bu-mitigating-circumstances.appspot.com' : 'http://localhost:3000')}))
app.use(passport.passport.initialize());
app.use(passport.passport.session());

// Import routes
require('./routes/routes')(app);

/**
 * GET /
 *
 * Returns the users account if they're logged in
 */
app.get('/',
	helper.checkIfLoggedIn,
	function (req, res) {
		res.json({ success: req.user });
	}
);

// Server setup 
const httpsOptions = {
	key: fs.readFileSync('./keys//keytmsp.pem'),
	cert: fs.readFileSync('./keys/cert.pem'),
	passphrase: 'developer'
}

// Run every min
setInterval(twitter, 60000);

const PORT = process.env.PORT || 3001;

if (process.env.PORT) {
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}...`);
	});
} else {
	const server = https.createServer(httpsOptions, app).listen(PORT, () => {
		console.log('server running on port' + PORT)
	})
}
