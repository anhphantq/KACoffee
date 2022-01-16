const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    'email': {type: String, default: '' },
    'first name': {type: String},
    'last name': {type: String},
    'phone': {type: String},
    'address': {type: String, default: ''},
    cart: {type: Schema.Types.ObjectId, ref: "Shopping Cart"},
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    point: {type: Number, default: 0},
    rank: {type: Number, enum: [0,1,2,3], default: 0},
    totalMoney: {type: Number, default: 0}, // the total money paid
    NbItem: {type: Number, default: 0}, // the number of item which bought
    NumExchangeItem: {type: Number, default: 0}, // the number of item which is used for getting 5t1 voucher 
    vouchers: [{type: Schema.Types.ObjectId, ref: "Voucher"}]
}, {collection: 'Users'});

module.exports = mongoose.model('Users', userSchema);