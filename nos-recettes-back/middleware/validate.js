// middleware validate input Email + password ...

// ------------------------- IMPORTS -------------------------

const { check, body, validationResult } = require("express-validator"); // package

// ============================================================
// ---------------------- Middlewares -------------------------

// SIGNUP
// Check if password & email inputs are correct
const userSignUpRules = () => {
	return [
		// Email input is filled /&/ is an email format ?
		check("email")
			.trim()
			.notEmpty()
			    .withMessage("this field is empty")
			.isEmail()
			    .withMessage("this email is not valid"),
		// Password input is filled /&/ minimum 5 chars /&/ correspond to regex ?
		check(
			"password",
			"Your password must have at least : 5 characters long. 1 uppercase & 1 lowercase character. 1 number."
		)
			.trim()
			.notEmpty()
			.withMessage("this field is empty")
			.isLength({ min: 5 })
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w@\-%]+$/),
		check("lastname").notEmpty().withMessage("this field is empty"),
		check("firstname").notEmpty().withMessage("this field is empty"),
	];
};

// EDIT users
const userEditRules = () => {
	return [
		check("username")
			.optional()
			.trim()
			.notEmpty()
			    .withMessage("this field is empty"),
		check("email")
			.optional()
			.trim()
            .notEmpty()
			    .withMessage("this field is empty")
			.isEmail()
			    .withMessage("this email is not valid"),
		check("lastname")
			.optional()
			.notEmpty()
			    .withMessage("this field is empty"),
		check("firstname")
			.optional()
			.notEmpty()
			    .withMessage("this field is empty"),
		check(
			"newPassword",
			"Your password must have at least : 5 characters long. 1 uppercase & 1 lowercase character. 1 number."
		)
			.optional()
			.trim()
			.notEmpty()
			    .withMessage("this field is empty")
			.isLength({ min: 5 })
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w@\-%]+$/),
		// Rules for new password
		body("password")
			.notEmpty()
			    .withMessage("this field is empty")
			// if the new password is provided...
			.if((value, { req }) => req.body.newPassword)
			// OR
			.if(body("newPassword").exists())
			// they must not be equal.
			.custom((value, { req }) => value !== req.body.newPassword)
                .withMessage(
                    "Your new password must be different from your previous password"
                ),
	];
};


// Handle errors messages ( next() is called if all is ok)
const validateRules = (req, res, next) => {
	const checkErrors = validationResult(req);
	// password or email is not good
	if (!checkErrors.isEmpty()) {
		// create an array of error messages
		const error = checkErrors.array().map((error) => {
			/* return { error: 'inputs are not valid !' }; */
			return { [error.param + "Error"]: error.msg };
		});

		return res.status(418).json({ error });
	}
	// inputs are correct
	next();
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { userSignUpRules, userEditRules, validateRules };
