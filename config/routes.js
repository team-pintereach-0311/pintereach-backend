const { authenticate } = require("../auth/authenticate");

const { login } = require("../routes/Auth/login");
const { register } = require("../routes/Auth/register");
const { getUserByIdArticles } = require("../routes/Users/users");
const { postArticles } = require("../routes/Users/users");

module.exports = server => {
  server.post("/auth/register", register);
  server.post("/auth/login", login);
  server.post("/users/articles", postArticles);
  //server.get("/", authenticate, users);
  server.get("/users/:id/articles", authenticate, getUserByIdArticles);
};
