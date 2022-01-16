const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    products: [{
        info: {type: Schema.Types.String, ref: "Product"},
        size: {type: String, enum: ["S","M","L"], default: "S"},
        sugar_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        ice_level: {type: Number, enum: [0,30,50,70,100], default: 100},
        amount: {type: Number, default: 1, min: 1}
    }],
    storeID: {type: Schema.Types.String, default: "1"},
    employee: {type: Schema.Types.ObjectId, ref: "Employees"},
    createAt: {type: Date, default: Date.now},
    status: {
        type: String, 
        enum: ["Verifying","Canceled","Processing","Shipping","Completed"],
        default: "Verifying"
    },
    price: {type: Number},  // tổng số tiền ban đầu
    point_value: {type: Number, default: 0}, // điểm sử dụng
    voucher_value: {type: Number, default: 0}, // tiền giảm từ voucher
    total: {type: Number}, // tiền cuối cùng 
    address: {type: String, default: "At store"},
    NbItem: {type: Number, default: 0}, // tổng số sản phẩm 
    type: {type: Number, enum: [0,1]} // 0: off - 1: onl type order
})

module.exports = mongoose.model("Order", orderSchema)
