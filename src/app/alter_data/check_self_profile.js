const userModel = require("../../models/users_model");
const employeeModel = require("../../models/employees_model");

module.exports = (app) => {
  app.route("/check_self_profile").get((req, res) => {
    let account_type = req.session.AccountType;
    if (account_type == "Customer") Model = userModel;
    else Model = employeeModel;
    Model.findOne({ email: req.session.UserEmail }, (err, account) => {
      if (account != null) res.json(account);
      else {
        res.status(401).send("Unauthorized");
      }
    });
  });
};
