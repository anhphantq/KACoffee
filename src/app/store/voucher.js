const voucherModel = require('../../models/voucher_model')
const userModel = require('../../models/users_model')

const codeVoucher5items = 'Voucher5items'
const NbVoucher5items = 5
const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
const charactersLength = characters.length
const codeLength = 7
// code generator
function codeGenerator() {
    var result = []
    for (var i = 0; i < codeLength; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        )
    }
    return result.join('')
}

function create(req, res) {
    if (req.session.AccountType == 'Admin') {
        const {
            name,
            description,
            activeDate,
            expireDate,
            minPaid,
            money,
            activeRank,
        } = req.body
        let isExist = false
        do {
            let code = codeGenerator()
            console.log(code)
            voucherModel.create(
                {
                    name: name,
                    description: description,
                    code: code,
                    activeDate: activeDate,
                    expireDate: expireDate,
                    minPaid: minPaid,
                    money: money,
                    activeRank: activeRank,
                },
                (err) => {
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            isExist = true
                        } else {
                            console.log(err)
                        }
                    }
                }
            )
        } while (isExist)

        res.send(JSON.stringify('created'))
    } else {
        return res.status(400).send(JSON.stringify('Unauthorized'))
    }
}

async function displayAll(req, res) {
    if (req.session.AccountType == 'Admin') {
        const vouchers = await voucherModel.find()
        return res.json(vouchers)
    }
    if (req.session.AccountType == 'Customer') {
        const {idAccount} = req.session

        const user = await userModel.findById(idAccount).populate('vouchers')
        if (user == null) {
            return res.status(404).send(JSON.stringify('Not found user'))
        } else return res.json(user)
    }
}

async function updateVoucher(req, res) {
    try {
        if (req.session.AccountType == 'Admin') {
            const {
                name,
                description,
                id_voucher,
                activeDate,
                expireDate,
                minPaid,
                money,
                activeRank,
            } = req.body
            const voucher = await voucherModel.findByIdAndUpdate(id_voucher, {
                name: description,
                description: description,
                activeDate: activeDate,
                expireDate: expireDate,
                minPaid: minPaid,
                money: money,
                activeRank: activeRank,
            })
            //await res.json(voucher)
            res.send(JSON.stringify('Successful!'))
        } else return res.status(400).send(JSON.stringify('Unauthorized'))
    } catch (err) {
        res.json(err)
    }
}

async function releaseVoucher(req, res) {
    try {
        if (req.session.AccountType == 'Admin') {
            const {id_voucher} = req.body

            const voucher = await voucherModel.findById(id_voucher)
            const rank = voucher.activeRank

            const users = await userModel.find({rank: rank})

            users.forEach((user) => {
                user.vouchers.push(id_voucher)
                user.save()
            })

            res.send(JSON.stringify('Release successfully!'))
        } else return res.status(400).send(JSON.stringify('Unauthorized'))
    } catch (err) {
        throw err
    }
}

function remove(req, res) {
    if (req.session.AccountType == 'Admin') {
        const {id_voucher} = req.body
        if (id_voucher == null) {
            res.status(404).json()
        } else {
            voucherModel.findOne({_id: id_voucher}, (err, voucher) => {
                if (err) {
                    res.status(500).json(err)
                } else if (voucher == null) {
                    //console.log("Not found");
                    res.status(404).json()
                } else {
                    voucherModel.deleteOne({_id: id_voucher}, () => {
                        res.send(JSON.stringify('deleted'))
                    })
                }
            })
        }
    } else {
        res.send(JSON.stringify('Only admin can create vouchers'))
    }
}

async function getVoucher5items(req, res) {
    try {
        const {idAccount} = req.session
        if (idAccount == null)
            return res.status(400).send(JSON.stringify('Unauthorized'))

        const user = await userModel.findById(idAccount)
        if (user == null) {
            return res.send(JSON.stringify('Not found user'))
        }

        if (user.NbItem >= NbVoucher5items) {
            const voucher = await voucherModel.findOne({
                code: codeVoucher5items,
            })
            if (voucher == null)
                return res.status(404).send(JSON.stringify('Not found voucher'))
            user.NbItem -= NbVoucher5items
            user.vouchers.push(voucher.id)
            user.save()

            res.json(user)
        } else {
            return res.send(JSON.stringify('Buy more to get this voucher!'))
        }
    } catch (err) {
        res.json(err)
    }
}

module.exports = (app) => {
    app.post('/voucher/create', (req, res) => {
        create(req, res)
    })
    app.get('/voucher/view', (req, res) => {
        displayAll(req, res)
    })
    app.put('/voucher/update', (req, res) => {
        updateVoucher(req, res)
    })
    app.post('/voucher/release', (req, res) => {
        releaseVoucher(req, res)
    })
    app.delete('/voucher/delete', (req, res) => {
        remove(req, res)
    })
    app.get('/voucher/getVoucher5items', (req, res) => {
        getVoucher5items(req, res)
    })
}
