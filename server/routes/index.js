const user = require("./user");
const inbox = require("./inbox");

module.exports = function mountRoutes(app) {
  app.use(user);
  app.use("/inbox", inbox);
};
