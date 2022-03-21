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

		/* const userId = decodedToken.userId;
        const isActive = decodedToken.isActive;
        const isAdmin = decodedToken.isAdmin; */
        if (!decodedToken.isActive) throw "Unauthorized"
        // pass the baton !
		res.locals.userId = decodedToken.userId;
        res.locals.isAdmin = decodedToken.isAdmin;
        
		next();
	} catch {
		// error
		res.status(401).json({ error: "Unauthorized" });
	}
};


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { authUser };
