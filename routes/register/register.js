module.exports = {
    register
}

const Users = require("../../database/userdb");
const bcrypt = require("bcrypt");

function register(req, res) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}