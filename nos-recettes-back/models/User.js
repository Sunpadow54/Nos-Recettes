// User model
// ------------------------- IMPORTS -------------------------
const db = require('../config/db-connect');
const format = require('pg-format');

// ============================================================

// Recipe constructor
// is_admin & is_active auto default in db
class User {
    constructor(user) {
        this.username = user.username;
        this.email = user.email;
        this.pass = user.password;
        this.lastname = user.lastname;
        this.firstname = user.firstname;
    }
}


User.create = (newUser) => {
    // define the query
    const insert = Object.keys(newUser);
    const values= Object.values(newUser);
    const query = format(`INSERT INTO users (%s) VALUES (%L)`, insert, values);
    // ask client
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            // error
            if (err && err.constraint === "users_username_key") return reject('This username already exist');
            if (err && err.constraint === "users_email_key") return reject('This email already exist');
            if (err) return reject(err/* .stack */);
            // success
            resolve(res/* 'User is successfully created' */);
        });
    })
};


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = User;