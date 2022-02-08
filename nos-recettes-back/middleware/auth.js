// Auth Token middleware

// ------------------------- IMPORTS --------------------------

const jwToken = require("jsonwebtoken");

// ============================================================
// ---------------------- Middleware -------------------------

const authUser = (req, res, next) => {
	try {
		// get the token from header and compare
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwToken.verify(token, process.env.TOKEN_KEY);
		const userId = decodedToken.userId;

		res.locals.userId = userId; // pass the baton !
		next();
	} catch {
		// error
		res.status(401).json({ error: "Unauthorized" });
	}
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { authUser };
