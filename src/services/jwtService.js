const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.createToken = (user) => {
	try {
		// the "try" code will be evaluated and attempted to concieve a result
		let token = jwt.sign({
			id: user._id,
			userName: user.userName,
			firstName: user.firstName,
			lastName: user.lastName
		}, secret, {expiresIn: expiry});
		return token
	} catch (err) {
		// if any error happens this block of code will run
		console.log(err)
		return null
	}
}

exports.decodeToken = (token) => {
	try {
		let decodedToken = jwt.verify(token, secret);
		return decodedToken;
	} catch (error) {
		console.log(error);
		return null
	}
}