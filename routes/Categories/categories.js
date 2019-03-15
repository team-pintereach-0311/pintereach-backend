module.exports = {
  getArticlesByCategoryName,
  getCategoryNames,
  addCategory,
  getUserCategories,
  updateCategoryName
};

const db = require("../../database/userdb");

function getArticlesByCategoryName(req, res) {
  const { name } = req.params;

  db.categoryfindBy(name).then(data => {
    if (data === undefined || data.length == 0) {
      res.status(404).json({
        message: "The category with the specified name does not exist."
      });
      return;
    } else {
      db.getCategoriesArticles(name)
        .then(data => {
          res.status(200).json(data);
          return;
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            error: "Category articles could not be retrived"
          });
          return;
        });
    }
  });
}

function getCategoryNames(req, res) {
  db.getCategories()
    .then(data => {
      res.status(200).json(data);
      return;
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Categories could not be retrived"
      });
      return;
    });
}

function addCategory(req, res) {
  const { name } = req.body;
  const { user_id } = req.params;
  if (!name || !user_id) {
    res.status(400).json({
      errorMessage: "Please provide name and user id for the category."
    });
    return;
  }
  db.addCategory({
    name,
    user_id
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
}

function getUserCategories(req, res) {
  const { id } = req.params;
  db.getById(id).then(user => {
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
      return;
    } else {
      db.getUserCategories(id)
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

function updateCategoryName(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  if (!name || !id) {
    res.status(400).json({
      errorMessage: "Please provide new name and id of the category."
    });
    return;
  }
  db.updateCategory(id, {
    name
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
}
