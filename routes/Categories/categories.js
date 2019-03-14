module.exports = { getArticlesByCategoryName, getCategoryNames, addCategory };

const db = require("../../database/userdb");

function getArticlesByCategoryName(req, res) {
  const { name } = req.params;

  db.categoryfindBy(name).then(data => {
    console.log(data);
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
  const { name, user_id } = req.body;
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
