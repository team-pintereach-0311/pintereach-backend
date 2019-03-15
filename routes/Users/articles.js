module.exports = {
  getAllUsers,
  getUserByIdArticles,
  postArticles,
  removeArticle,
  updateArticle,
  getAllArticles
};

const db = require("../../database/userdb");

function getAllUsers(req, res) {
  db.get()
    .then(users => {
      users = users.map(({ username }) => username);
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "User list could not be retrieved."
      });
      return;
    });
}

function getAllArticles(req, res) {
  db.get()
    .then(data => {
      //users = users.map(({ username }) => username);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "User list could not be retrieved."
      });
      return;
    });
}

function getUserByIdArticles(req, res) {
  const { id } = req.params;

  db.getById(id).then(user => {
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
      return;
    } else {
      db.getUserArticles(id)
        .then(user => {
          res.status(200).json(user);
          return;
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: "User article could not be retrived"
          });
          return;
        });
    }
  });
}

function postArticles(req, res) {
  const { title, cover_page, link, user_id, categories_id } = req.body;
  if (!title && !link) {
    res.status(400).json({
      errorMessage: "Please provide title or link for the article."
    });
    return;
  }
  if (!user_id) {
    res.status(400).json({
      errorMessage: "User id not provided. Article can not be accepted."
    });
    return;
  }
  db.getById(user_id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }
      db.addarticle({
        title,
        user_id,
        link,
        cover_page
      })
        .then(response => {
          articles_id = response.id;
          db.addToCategory({ articles_id, categories_id });
          res.status(201).json(response);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          });
          return;
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The article information could not be retrieved."
      });
      return;
    });
}

function removeArticle(req, res) {
  const { id } = req.params;
  const { userid } = req.body;

  db.deleteArticleById(id)
    .then(response => {
      if (response === 0) {
        res.status(404).json({
          message: "The artical with the specified ID does not exist."
        });
        return;
      }
      res.status(200).json({ message: `artical ${id} removed.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The artical could not be removed"
      });
      return;
    });
}

function updateArticle(req, res) {
  const { id } = req.params;
  const { title, cover_page, link, categories_id, is_public } = req.body;
  if (!title && !link) {
    res.status(400).json({
      errorMessage: "Please provide title or link for the article."
    });
    return;
  }
  db.updateArticle(id, {
    title,
    link,
    cover_page,
    is_public
  })
    .then(response => {
      db.changeToCategory(id, { categories_id })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
      return;
    });
}
