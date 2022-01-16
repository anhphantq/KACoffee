const cart = require("./cart")
const order = require("./order")

module.exports = (app) => {
    cart(app)
    order(app)
}