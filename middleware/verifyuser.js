const db = require("../database/userdb");

// quickly see what this file exports
module.exports = {
  isUserOrAdmin
};

// implementation details

async function isUserOrAdmin(req, res, next) {
  try {
    console.log(req.decoded.subject);
    let userInCheck = await db.getById(req.decoded.subject);
    console.log(userInCheck);
    if (userInCheck.id === Number(req.params.userid) || userInCheck.is_admin) {
      next();
    } else {
      next({ code: 401 });
    }
  } catch (err) {
    next(err);
  }
}
