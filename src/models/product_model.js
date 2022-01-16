const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

let ProductSchema = new Schema(
    {
        _id: {type: Number,},
        name: {type: String, require: true},
        price: {type: String, require: true},
        type: {type: String},
        description: {type: String},
        image: {type: String},
        rateLevel: {type: Array, default: [0,0,0,0,0]},
        rateNumber: {type: Number, default: 0}
    }, 
    {
        _id: false,
    })

ProductSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Product', ProductSchema)