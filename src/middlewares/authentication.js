exports.authenticateUser = (req, res, next) => {
	// check if there is an authorization token
	if (!req.headers.authorization) {
		return res.status(401).json({message: "authorization header required"});
	}
	next()
	// decode token
	// check if valid
	// allow user to continue with request
}