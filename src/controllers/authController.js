const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "verySecureSecret";
const expiry = 3600;

exports.registerNewUser = (req, res) => {
	// fetch users details from req.body
	// check if user with this username exists
	User.findOne({userName: req.body.userName}, (err, existingUser) => {
		if (err) {
			return res.status(500).json({err});
		} 
		if (existingUser) {
			return res.status(400).json({message: "a user with this username already exists"})
		}
		User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName
		}, (err, newUser) => {
			if (err) {
				return res.status(500).json({err});
			}
			// hash users password
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					return res.status(500).json({err});
				}
				bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
					if (err) {
						return res.status(500).json({err});
					}
					// save password to db
					newUser.password = hashedPassword;
					newUser.save((err, savedUser) => {
						if (err) {
							return res.status(500).json({err});
						}
						// create jwt for user
						jwt.sign({
							id: newUser._id,
							userName: newUser.userName,
							firstName: newUser.firstName,
							lastName: newUser.lastName
						}, secret, {expiresIn: expiry}, (err, token) => {
							if (err) {
								return res.status(500).json({err});
							} 
							// send token to user
							return res.status(200).json({
								message: "user registration successful",
								token
							})
						})
					})
				})
			})
		})
	})
}

exports.loginUser = (req, res) => {
	// check if user exists
	User.findOne({userName: req.body.userName}, (err, foundUser) => {
		if (err) {
			return res.status(500).json({err});
		}
		if (!foundUser) {
			return res.status(401).json({message: "incorrect username"});
		} 
		// check if password is correct
		let match = bcrypt.compareSync(req.body.password, foundUser.password);
		if (!match) {
			return res.status(401).json({message: "incorrect password"});
		}
	// create a token
	jwt.sign({
		id: foundUser._id,
		username: foundUser.username,
		firstName: foundUser.firstName,
		lastName: foundUser.lastName
	}, secret, {
		expiresIn: expiry
	}, (err, token) => {
		if (err) {
			return res.status(500).json({err});
		}
		// send token to user
		return res.status(200).json({
			message: "user logged in",
			token
		})
	})
})
}