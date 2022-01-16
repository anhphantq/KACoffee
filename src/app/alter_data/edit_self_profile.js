const employeeModel = require("../../models/employees_model");
const userModel = require("../../models/users_model");
const authenticationModel = require("../../models/authentication_model");

module.exports = (app) => {
  app.route("/edit_self_profile").post(async (req, res) => {
    let update = req.body;  
    let new_password = null;
    if (update.password) {
      new_password = update.password;
      update = Object.assign({}, update, { password: undefined });
    }
    if (req.session.AccountType == "Customer") Model = userModel;
    else {
      Model = employeeModel;
    }

    const data = await Model.findOneAndUpdate(
      { email: req.session.UserEmail },
      update,
      {
        new: true,
      }
    );

    if (new_password) {
      authenticationModel.findOne(
        { email: req.session.UserEmail },
        (err, account) => {
          if (err) throw err;
          else {
            account.password = new_password;
            account.save();
          }
        }
      );
    }
    res.status(200).send(JSON.stringify("OK"));    
  });
};
