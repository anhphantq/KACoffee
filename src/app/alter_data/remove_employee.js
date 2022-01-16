const employeeModel = require("../../models/employees_model");
const authenticationModel = require("../../models/authentication_model");

module.exports = (app) => {
  app.route("/remove_employee")
  .post((req, res) => {
    //check admin
    if (req.session.AccountType != "Admin")
      res.send(JSON.stringify("Only Admin can remove employee"));
    let email = req.session.UserEmail;

    employeeModel.deleteOne({ email: email }, () => {
      res.send(JSON.stringify("email not exist"));
      this.return;
    });
    authenticationModel.deleteOne({ email: email }, () => {
      res.send(JSON.stringify("email not exist"));
      this.return;
    });
  });
};
