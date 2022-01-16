const mongoose = require("mongoose")
const Schema = mongoose.Schema

const voucherSchema = new Schema({
    name: {type: String, default: "Voucher"},
    description: {type: String, default: "Giảm giá 10.000"},
    code: {type: String, require: true, unique: true },
    users: [{type: Schema.Types.ObjectId, ref: "Users"}],
    activeDate: {type: Date, require: true},
    expireDate: {type: Date, require: true},
    minPaid: {type: Number, default: 0},
    money: {type: Number, deafault: 0},
    activeRank: {type: Number, default: 0}
})

module.exports = mongoose.model("Voucher", voucherSchema)