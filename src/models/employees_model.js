const mongoose = require('mongoose');
const Schema = mongoose.Schema

let employeeSchema = new Schema({
    'email': {type: String, default: '' },
    'first name': {type: String},
    'last name': {type: String},
    'phone': {type: String},
    'address': {type: String, default: ''},
    'account type': {type: String, default: ''},
    'storeID': {type: String, default: '1'}
}, {collection: 'Employees'});

module.exports = mongoose.model('Employees', employeeSchema);