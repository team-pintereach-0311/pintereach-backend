const db = require("./dbConfig.js");

module.exports = {
  get,
  getById,
  add,
  find,
  findBy,
  findById,
  getUserArticles,
  addarticle
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getArticleById(id) {
  return db("articles")
    .where({ id })
    .first();
}

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserArticles(userId) {
  return db("articles as a")
    .join("users as u", "u.id", "a.user_id")
    .select(
      "a.id",
      "a.title",
      "a.cover_page",
      "a.link",
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
