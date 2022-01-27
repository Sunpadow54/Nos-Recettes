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
    const values = Object.values(newUser);
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


User.findOne = (user) => {
    const insert = Object.keys(user);
    const value = Object.values(user);

    // define the query
    const query = format(
        `SELECT u.*, nbr
        FROM users AS u
        LEFT JOIN (
            SELECT id_user, id, COUNT(id) AS nbr
            FROM recipes
            GROUP BY id
        ) r ON r.id_user = u.id
        WHERE u.%s = %L
        ;`, insert, value);


    // ask client
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            // errors
            if (res === undefined) return reject('This account does not exist');

            if (err) return reject(err);
            // success
            resolve(res.rows[0]);
        })
    });
};

User.edit = (user, userId) => {
    // format the insert for SET
    let inserts = [];
    for (let key in user) {
        inserts.push(format('%s = %L', key, user[key]));
    }
    // define the query
    const query = format(`
            UPDATE users 
            SET %s 
            WHERE id =%L
            RETURNING lastname AS "newLastname", firstname AS "newFirstname", email AS "newEmail"
            `, inserts, userId
    );

    // ask client
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            // errors
            if (err && err.constraint === "users_username_key") return reject('This username already exist');
            if (err && err.constraint === "users_email_key") return reject('This email already exist');
            if (err) return reject(err);
            // if (res.changedRows === 0) return reject('This User has not been updated')
            // success
            resolve(res.rows[0]);
        })
    });
}

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = User;