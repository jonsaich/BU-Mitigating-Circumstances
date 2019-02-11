const datastore = require('../../db/cloud-datastore');
const kind = 'User';

var functions = {
    findUserAccount(email, id, twitterId, callback) {
        var query;

        if (email != null) {
            query = datastore
                .createQuery('User')
                .filter('email', '=', email)
                .limit(1);
        } else if (twitterId != null) {
            query = datastore
                .createQuery('User')
                .filter('twitterId', '=', twitterId)
                .limit(1);
        } else {
            query = datastore
                .createQuery('User')
                .filter('__key__', '=', datastore.key(['User', Number(id)]))
        }

        datastore.runQuery(query, function (err, books, d) {
            console.log(err)
            console.log(books)
            if (books[0] != null) {
                books[0].id = books[0][datastore.KEY]['id'];
            }

            console.log('This isssss....')
            console.log(twitterId)
            console.log(books[0])
            callback(err, books[0], d)
        });
    },
    addUserAccount(user, cb) {
        const kind = 'User';
        const taskKey = datastore.key(kind);
        const userItem = {
            key: taskKey,
            data: user
        };

        // Saves the entity
        datastore
            .save(userItem)
            .then(() => {
                cb();
                console.log(`Saved ${user.key.name}: ${user.data.description}`);
            })
            .catch(err => {
                cb(err);
                console.error('ERROR:', err);
            });
    },
    updateUser(id, user, cb) {
        const taskKey = datastore.key([kind, Number(id)]);
        const userItem = {
            key: taskKey,
            data: user
        };

        // Saves the entity
        datastore
            .save(userItem)
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