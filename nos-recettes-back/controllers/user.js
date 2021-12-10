// Controls User
// ------------------------- IMPORTS -------------------------
const bcrypt = require('bcrypt'); // package password cryptage
const { encryptEmail } = require('../middleware/crypto.js'); // import crypto tool
// ---- import Models
const User = require('../models/User');

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.createUser = (req, res, next) => {
    // hash the password sent
    bcrypt.hash(req.body.password, 10)
        .then(passwordHashed => {
            // create user based on model User
            const newUser = new User({
                username: req.body.username,
                email: encryptEmail(req.body.email),
                password: passwordHashed,
                lastname: req.body.lastname,
                firstname: req.body.firstname
            });

            // save user in database
            User.create(newUser)
                .then(message => res.status(201).json({ message }))
                .catch(error => res.status(500).json({ error }));
        })
};