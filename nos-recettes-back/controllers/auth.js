// Auth Controls
// ------------------------- IMPORTS -------------------------

const bcrypt = require("bcrypt"); // package password cryptage
const jwToken = require("jsonwebtoken"); // package token

// ---- import User Model
const User = require("../models/User");

// ============================================================
// -------------------------- CONTROLS ------------------------

exports.login = (req, res, next) => {
	// Search User in db with email using User model
	User.findOne({ username: req.body.username })
		.then((user) => {
			// Compare password
			bcrypt
				.compare(req.body.password, user.pass)
				.then((valid) => {
					// password error
					if (!valid) {
						throw "Incorrect Password";
					}

					// success
					res.status(200).json({
						// send user _id & token auth
						id: user.id,
						token: jwToken.sign(
							// 1rst param : payload : data we wants to encode
							{ userId: user.id },
							// 2nd param : secret key for encode
							process.env.TOKEN_KEY,
							// 3rd param : to configure duration of the token
							{ expiresIn: "24h" }
						),
						username: user.username,
						isActive: user.is_active,
						isAdmin: user.is_admin,
					});
				})
				.catch((error) => res.status(401).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
