let log_out = (app) => {
  app.route("/log_out").get((req, res) => {
    req.session.destroy((error) => {
      if (error) res.status(500).json(err);
      res.status(200).send("OK");
    });
  });
};
module.exports = log_out;
