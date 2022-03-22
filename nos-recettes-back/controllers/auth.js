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
			if (!user) {
				let error = new Error("This username does not exist");
				error.status = 404;
				throw error;
			}
			// Compare password
			bcrypt
				.compare(req.body.password, user.pass)
				.then((valid) => {
					// password error
					if (!valid) throw new Error("Incorrect Password");

					// success
					res.status(200).json({
						// send user _id & token auth
						id: user.id,
						token: jwToken.sign(
							// 1rst param : payload : data we wants to encode
							{ userId: user.id, isAdmin: user.is_admin, isActive: user.is_active},
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
				.catch((error) => res.status(401).json(error.message));
		})
		.catch((error) => res.status(error.status || 500).json(error.message));
};
