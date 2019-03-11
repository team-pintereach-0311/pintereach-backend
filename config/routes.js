const { authenticate } = require("../auth/authenticate");

const { login } = require("../routes/login/login");
const { register } = require("../routes/register/register");

module.exports = server => {
  server.post("/auth/register", register);
  server.post("/auth/login", login);
  //server.get("/", authenticate, users);
};