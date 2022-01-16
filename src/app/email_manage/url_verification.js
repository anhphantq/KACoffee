
const code_verification_model = require('../../models/code_verification_model');
const account_model = require('../../models/authentication_model');
const html_path_dict ={
    'password_change': '/changepassword',
    'email_verify': '/login',
}
module.exports = (app)=>{
    app.get('/code_verify', (req, res)=>{
        let code = req.query.code;
        let email = req.query.email;
        let service_type = req.query.service_type;
        code_verification_model.findOne({'email': email}, (err, authen)=>{
            if (err) throw err;
            else{
                if (authen == null){
                    res.status(404).send(JSON.stringify('can not verify'));
                }
                else{
                    if(authen.code == code){
                        account_model.findOne({'email': email}, async (err, account)=>{
                            if (err) throw err;
                            else{
                                if (service_type == 'password_change'){
                                    let set_session = await function (req, email, account_type){
                                        req.session.UserEmail = email;
                                        req.session.AccountType = account_type;
                                    }
                                    set_session(req, authen.email, account['account_type']);
                                }
                                
                                res.status(200).redirect(html_path_dict[service_type]);
                            }
                            
                        })
                    }
                    else{
                        res.status(404).send(JSON.stringify('can not verify'));
                    }
                }
            }
        })
    })
}