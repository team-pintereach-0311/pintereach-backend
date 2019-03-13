module.exports = {
  getAllUsers,
  getUserByIdArticles,
  postArticles
};

const db = require("../../database/userdb");

function getAllUsers(req, res) {
  db.get()
    .then(users => {
      res.json(users.username);
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
            error: "User posts could not be retrived"
          });
          return;
        });
    }
  });
}

function postArticles(req, res) {
  const { title, cover_page, link, user_id } = req.body;
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
        error: "The posts information could not be retrieved."
      });
      return;
    });
}
