const { authenticate } = require("../auth/authenticate");

const { login } = require("../routes/Auth/login");
const { register } = require("../routes/Auth/register");

module.exports = server => {
  server.post("/auth/register", register);
  server.post("/auth/login", login);
  //server.get("/", authenticate, users);
};