const db = require("../database/userdb");

// quickly see what this file exports
module.exports = {
  isUserOrAdmin
};

// implementation details

async function isUserOrAdmin(req, res, next) {
  try {
    let userInCheck = await db.getById(req.decoded.subject);
    if (userInCheck.id === Number(req.params.userid) || userInCheck.is_admin) {
      next();
    } else {
      return res.status(401).json({
        error: "Not article owner or admin"
      });
      //next({ code: 401 });
    }
  } catch (err) {
    next(err);
  }
}
