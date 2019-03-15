const db = require("./dbConfig.js");

module.exports = {
  get,
  getById,
  add,
  findBy,
  getUserArticles,
  addarticle,
  getCategories,
  getCategoriesArticles,
  categoryfindBy,
  deleteArticleById,
  addCategory,
  getUserCategories,
  addToCategory,
  updateCategory
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where("id", id)
    .first();
}

function getArticleById(id) {
  return db("articles")
    .where("id", id)
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return getById(id);
}

// function getUserArticles(userId){
//   return db('articles')
// }

function getUserArticles(userId) {
  return db("articles as a")
    .join("users as u", "u.id", "a.user_id")
    .join("articles_categories_relationship as ac", "a.id", "ac.articles_id")
    .join("categories as c", "ac.categories_id", "c.id")
    .select(
      "u.id as userid",
      "a.id",
      "a.title",
      "a.cover_page",
      "a.link",
      "c.name as category_name",
      "u.username as postedBy"
    )
    .where("a.user_id", userId);
}

function addarticle(params) {
  return db("articles")
    .insert(params)
    .then(ids => {
      return getArticleById(ids[0]);
    });
}

function addCategory(params) {
  return db("categories")
    .insert(params)
    .then(ids => {
      return getArticleById(ids[0]);
    });
}

function getCategories() {
  return db("categories").select("id", "categories.name");
}

function getCategoriesArticles(params) {
  return db("categories as c")
    .join("articles_categories_relationship as ac", "ac.categories_id", "c.id")
    .join("articles as a", "a.id", "ac.articles_id")
    .select("a.id", "a.title", "a.cover_page", "a.link")
    .where("c.name", params);
}

function getUserCategories(params) {
  return db("categories").where("user_id", params);
}

function categoryfindBy(filter) {
  return db("categories as c").where("c.name", filter);
}

function deleteArticleById(id) {
  return db("articles")
    .where("id", id)
    .del();
}

function addToCategory(params) {
  return db("articles_categories_relationship")
    .insert(params)
    .then(ids => {
      return;
    });
}

function updateCategory(id, changes) {
  return db("categories")
    .where({ id })
    .update(changes);
}
