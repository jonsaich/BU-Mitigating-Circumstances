var Datastore = require('@google-cloud/datastore');
var config = require('../config');

// Your Google Cloud Platform project ID
const projectId = config.google_cloud.project_id;

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});

module.exports = datastore;