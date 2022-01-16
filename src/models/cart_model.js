const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"
    },
    products: [{
        info: {type: Schema.Types.String, ref: "Product"},
        size: {type: String, enum: ["S","M","L"], default: "S"},
        sugar_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        ice_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        amount: {type: Number, default: 1, min: 1},
        price: {type: Number, default: 0}
    }],
    priceTotal: {type: Number, default: 0},
    NbItem: {type: Number, default: 0}, // tổng số sản phẩm 
    storeID: {type: Schema.Types.String, default: "1"},
})

module.exports = mongoose.model('Shopping Cart', cartSchema)