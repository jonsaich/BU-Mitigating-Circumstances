const datastore = require('../../db/cloud-datastore');
const kind = 'Twitter-DMS';

var functions = {
    getMostRecentDM(callback) {
      var query = datastore
      .createQuery(kind)
      .order('created_timestamp', {
        descending: true,
      })
      .limit(1)

      datastore.runQuery(query, function (err, dM, d) {
        callback(err, dM[0], d)
      });
    },
    addDMs(dmS, cb) {
      const taskKey = datastore.key(kind);
      var dMsToAdd = [];
    
      dmS.forEach(function(dm) {
        dMsToAdd.push({
          key: taskKey,
          data: dm
        })
      });

      datastore
      .upsert(dMsToAdd)
      .then(() => {
          cb();
          console.log(`Saved ${user.key.name}: ${user.data.description}`);
      })
      .catch(err => {
          cb(err);
          console.error('ERROR:', err);
      });
    },
    updateMitigatingCircumstance(id, mitCircum, cb) {
        const taskKey = datastore.key([kind, Number(id)]);
    
        const mitCircumItem = {
            key: taskKey,
            data: mitCircum
        };
    
        // Saves the entity
        datastore
        .save(mitCircumItem)
        .then(() => {
            cb();
            //console.log(`Saved ${user.key.name}: ${user.data.description}`);
        })
        .catch(err => {
            cb(err);
            console.error('ERROR:', err);
        });
    }
}

module.exports = functions;