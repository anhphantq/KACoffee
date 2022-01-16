const url_verification = require('./url_verification');
const email_sender = require('./email_sender');

module.exports = (app)=>{
    url_verification(app);
    email_sender(app);
}