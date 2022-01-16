const mongoose = require('mongoose')
//need to be creditial
const config = require('./config');
const url = config.url;

const connectionParams={
    useNewUrlParser: true
}

let connect = ()=>{
    console.log('Connecting...')
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Connected to database ');
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
    })
};

module.exports = connect;