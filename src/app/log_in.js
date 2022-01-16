const authenticationModel = require("../models/authentication_model");
const user_model = require("../models/users_model")
const employee_model = require("../models/employees_model")

module.exports = (app)=> {  
    app.route('/log_in')
        .post((req, res)=> {
            try{
                //check log in info  
                authenticationModel.findOne({'email': req.body.email}, (err, account)=>{
                    if (err) throw err;
                    if (account == null) res.send(JSON.stringify('email not exist'));
                    else{
                        if (account.password == req.body.password){
                            let Model
                            if(account['account type'] == "Customer") Model = user_model
                            else Model = employee_model

                            Model.findOne({email: req.body.email},(err, info) => {
                                if(err) throw err
                                if(info == null) console.log("Account empty!")
                                else req.session.idAccount = info.id
                                //console.log(typeof(req.session.idAccount))
                                req.session.UserEmail = account.email;
                                req.session.AccountType = account['account type'];
                                res.send(JSON.stringify('log in accepted'));
                            })
                        }
                        else{
                            res.send(JSON.stringify('wrong password'));
                        }
                    }
                })
            }
            catch (err){
                res.status(500).send(err);
            }
        }
    );
};
