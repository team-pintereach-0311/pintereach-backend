const { authenticate } = require("../middleware/authenticate");
const { isUserOrAdmin } = require("../middleware/verifyuser");
const { login } = require("../routes/Auth/login");
const { register } = require("../routes/Auth/register");
const { getUserByIdArticles } = require("../routes/Users/articles");
const { getAllUsers } = require("../routes/Users/articles");
const { postArticles } = require("../routes/Users/articles");
const {
  getArticlesByCategoryName
} = require("../routes/Categories/categories");
const { updateArticle } = require("../routes/Users/articles");
const { getCategoryNames } = require("../routes/Categories/categories");
const { removeArticle } = require("../routes/Users/articles");
const { addCategory } = require("../routes/Categories/categories");
const { getUserCategories } = require("../routes/Categories/categories");
const { updateCategoryName } = require("../routes/Categories/categories");
const { getAllArticles } = require("../routes/Users/articles");

module.exports = server => {
  server.post("/auth/register", register);
  server.post("/auth/login", login);
  server.get("/users", authenticate, getAllUsers);
  server.post("/users/articles", authenticate, postArticles);
  server.get("/users/articles", authenticate, getAllArticles);
  //server.get("/", authenticate, users);
  server.get("/users/:id/articles", authenticate, getUserByIdArticles);
  server.get(
    "/categories/:name/articles",
    authenticate,
    getArticlesByCategoryName
  );
  server.get("/categories", authenticate, getCategoryNames);
  server.delete(
    "/users/:userid/articles/:id",
    authenticate,
    isUserOrAdmin,
    removeArticle
  );
  server.post("/users/:user_id/articles/category", authenticate, addCategory);
  server.get("/categories/:id", authenticate, getUserCategories);
  server.put(
    "/categories/:id",
    authenticate,
    isUserOrAdmin,
    updateCategoryName
  );
  server.put(
    "/users/:userid/articles/:id",
    authenticate,
    isUserOrAdmin,
    updateArticle
  );
};
