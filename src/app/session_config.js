const _24hours = 1000 * 60 * 60 * 24
let session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session)
let DBconfig = require('../dbConfig/config')
const shortid = require('shortid')

var store = new MongoDBStore({
    uri: DBconfig.url,
    collection: 'log_in_sessions',
})

//catch errors
store.on('error', function (error) {
    console.log(error)
})

module.exports.init = (app) => {
    app.use(
        session({
            genid: function (req) {
                return shortid.generate()
            },
            secret: DBconfig.pw,
            cookie: {
                //secure need to be set to true when implement
                secure: false,
                AccountType: 'Guest', // guest until  login
                UserEmail: null, //should contain email
                idAccount: null,
                maxAge: 30 * _24hours,
            },
            saveUninitialized: true,

            resave: true,
            store: store,
        })
    )
}

module.exports.session_store = store
