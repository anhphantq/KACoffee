const employee = require("./employee")
const voucher = require("./voucher")
const product = require("./product")
const blog = require("./blog")
const admin = require("./admin")

module.exports = (app) => {
    employee(app)
    voucher(app)
    product(app)
    blog(app)
    admin(app)
}