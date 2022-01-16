const orderModel = require('../../models/order_model')

async function stats_by_date(req, res) {
    try {
        if (req.session.AccountType == 'Admin') {
            const {start, end} = req.body
            let starting_date = new Date(start),
                ending_date = new Date(start)
            //starting_date.setDate(starting_date.getDate() + 1)
            if (end == null) ending_date.setDate(starting_date.getDate() + 1)
            else {
                ending_date = new Date(end)
                ending_date.setDate(ending_date.getDate() + 1)
            }
            //console.log(ending_date.getDate())
            //console.log(starting_date.getDate())
            const orders = await orderModel
                .find({createAt: {$gte: starting_date, $lt: ending_date}})
                .populate({path: 'products.info'})
                .populate('user')
            return res.json(orders)
        } else {
            return res.status(400).send(JSON.stringify('Unauthorized'))
        }
    } catch (err) {
        throw err
    }
}

async function stats_by_product(req, res) {}

module.exports = (app) => {
    app.post('/stats/by_date', (req, res) => {
        stats_by_date(req, res)
    })

    app.post('/stats/by_product', (req, res) => {})
}
