const mongoose = require('mongoose');
const Schema = mongoose.Schema

let authenticationdSchema = new Schema({
    'email': {type: String},
    'password': {type: String},
    'account type': {type: String}
}, {collection: 'Authentication'} );

module.exports = mongoose.model('Authentication', authenticationdSchema);


