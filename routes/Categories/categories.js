module.exports = { getArticlesByCategoryName };

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
