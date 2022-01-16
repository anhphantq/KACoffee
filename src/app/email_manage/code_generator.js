const shortid = require("shortid");
const code_verification_model = require('../../models/code_verification_model');

module.exports = (email, service_type)=>{
    let code = shortid.generate();
    code_verification_model.create({
        code: code,
        email: email,
    })
    
    //need to change url
    return new URL(`http://localhost:3000/code_verify?code=${code}&email=${email}&service_type=${service_type}`);
}