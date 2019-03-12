module.exports = {
    login,
};

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const Users = require("../../database/userdb");

function generateToken(user) {
    console.log("gen token", user);
    const payload = {
        subject: user.id,
        username: user.username
    };

    const secret = process.env.JWT_SECRET || "this is not a secret :P";
    console.log(secret);
    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options);
}

function login(req, res) {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                console.log("token", token);
                res.status(200).json({
                    id: user.id,
                    message: `Willkommen, ${user.username}`,
                    token
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "An error occured" });
        });
}

