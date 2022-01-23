// Controls User
// ------------------------- IMPORTS -------------------------
const bcrypt = require('bcrypt'); // package password cryptage
const { encryptEmail, decryptEmail } = require('../middleware/crypto.js'); // import crypto tool
// ---- import Models
const User = require('../models/User');


// ============================================================
// -------------------------- Function ------------------------

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function checkPassword(password, passwordToCompare) {
    const match = await bcrypt.compare(password, passwordToCompare);
    if (!match) {
        let error = new Error('Incorrect Password');
        error.code = 401
        throw error
    }
    return true;
}


// ============================================================
// -------------------------- CONTROLS ------------------------

exports.createUser = (req, res, next) => {
    // hash the password sent
    hashPassword(req.body.password)
        .then(passwordHashed => {
            // create user based on model User
            const newUser = new User({
                username: req.body.username,
                email: encryptEmail(req.body.email),
                password: passwordHashed,
                lastname: req.body.lastname,
                firstname: req.body.firstname
            });
            // ! ? : when Admin create the account, send email to the new user for pass and username  (cf : npm nodemailer)

            // save user in database
            return User.create(newUser)
        })
        .then(message => res.status(201).json({ message }))
        .catch(error => res.status(500).json({ error }));
};


exports.editUser = (req, res, next) => {
    User.findOne({ id: 2 }) // ! use res.locals
        // 1 : Confirm password
        .then(user => {
            return checkPassword(req.body.oldPassword, user.pass);
        })
        // 2 : If user send a new password Hash it
        .then(valid => {
            if (req.body.newPassword) {
                return hashPassword(req.body.newPassword)
            }
        })
        // 3 : Create new user object and update in db
        .then(newPass => {
            let userEdited = {
                ...req.body
            };
            delete userEdited.oldPassword;
            delete userEdited.newPassword;
            // add password if newPass
            req.body.email ? userEdited.email = encryptEmail(req.body.email) : false;
            newPass ? userEdited.pass = newPass : false; // add password if changed
            // Update in the db
            return User.edit(userEdited, 2) // ! use res.locals
        })
        // SUCESS : send message
        .then(message => {
            res.status(201).json({
                ...message, newEmail: decryptEmail(message.newEmail)
            })
        })
        // ERRORS
        .catch(error => {
            // custom error and status code
            const code = error.code ? error.code : 500;
            const message = error.message ? error.message : error;
            res.status(code).json({ error: message })
        });
};


exports.getOneUser = (req, res, next) => {
    User.findOne(req.params.id)
        .then(user => {
            const userData = {
                username: user.username,
                email: decryptEmail(user.email),
                lastname: user.username,
                firstname: user.username,
                nbrRecipes: user.nbr
            };
            res.status(201).json(userData);
        })
        .catch(error => res.status(500).json({ error }));
};