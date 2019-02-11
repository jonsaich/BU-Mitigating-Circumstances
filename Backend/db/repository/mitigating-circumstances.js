const datastore = require('../../db/cloud-datastore');
const kind = 'Mitigating-Circumstances';

var functions = {
    getMitigatingCircumstances(userId, tutorId, mitCircumId, callback) {
        var query;

        if(userId) {
            console.log('hit here');
            query = datastore
            .createQuery(kind)
            .filter('student.studentId', '=', userId);

        } else if(mitCircumId){
            query = datastore
            .createQuery(kind)
            .filter('__key__', '=', datastore.key([kind, Number(mitCircumId)]))
            .limit(1);
        } else {
            query = datastore
            .createQuery(kind)
            .filter('tutorId', '=', tutorId)
        }

        datastore.runQuery(query, function (err, mCs, d) {
            
            
            mCs.map(function(mitC) {
                mitC.id = mitC[datastore.KEY]['id']
            })

            mCs.sort(function(a, b) {
                return b.status[0].lastUpdated - a.status[0].lastUpdated;
            });
            callback(err, mCs, d)
        });
    },
    addMitigatingCircumstance(mitCircum, cb) {
        const taskKey = datastore.key(kind);
    
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