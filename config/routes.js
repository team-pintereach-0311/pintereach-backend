const { authenticate } = require("../auth/authenticate");

const { login } = require("../routes/Auth/login");
const { register } = require("../routes/Auth/register");
const { getUserByIdArticles } = require("../routes/Users/articles");
const { postArticles } = require("../routes/Users/articles");
const {
  getArticlesByCategoryName
} = require("../routes/Categories/categories");
const { getCategoryNames } = require("../routes/Categories/categories");
const { removeArticle } = require("../routes/Users/articles");
const { addCategory } = require("../routes/Categories/categories");

module.exports = server => {
  server.post("/auth/register", register);
  server.post("/auth/login", login);
  server.post("/users/articles", authenticate, postArticles);
  //server.get("/", authenticate, users);
  server.get("/users/:id/articles", authenticate, getUserByIdArticles);
  server.get(
    "/categories/:name/articles",
    authenticate,
    getArticlesByCategoryName
  );
  server.get("/categories", authenticate, getCategoryNames);
  server.delete("/users/:userid/articles/:id", authenticate, removeArticle);
  server.post("/users/:user_id/articles/category", authenticate, addCategory);
};
