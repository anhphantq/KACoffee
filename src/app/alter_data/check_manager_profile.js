const employeeModel = require('../../models/employees_model');

module.exports = (app) =>{
    app.route('/check_manager_profile')
    .get((req, res) =>{
        employeeModel.findOne({'email': req.session.UserEmail}, (err, account) =>{
            if (err) throw err;
            else{
                employeeModel.findOne({'storeID': account.storeID, 'account type': 'Admin'}, (err, admin) => {
                    if (err) throw err;
                    else{
                        if(admin != null) res.json(admin);       
                        else{
                            res.send(JSON.stringify('admin not exist'));
                        }
                    }
                })
            }
        })
    })
}