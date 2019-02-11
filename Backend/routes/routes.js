var user = require('./controllers/user');
var mitigatingCircumstances = require('./controllers/mitigating-circumstances');

module.exports = function(app){
    app.use('/user', user);
    app.use('/mitigating-circumstances', mitigatingCircumstances);
}