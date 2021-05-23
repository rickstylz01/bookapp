const Book = require('../models/book');


exports.createNewBook = function (req, res) {
 	// retrieve new book details from req body
 	Book.create({
 		...req.body
 	}, (err, newBook) => {
 		if (err) {
 			return res.status(500).json({message: err});
 		} else {
 			res.status(200).json({message: 'new book created', newBook});
 		}
 	})
}

exports.fetchBooks = (req, res) => {
	let conditions = {};
	if (req.query.category) {
		conditions.category = req.query.category;
	}
	if (req.query.author) {
		conditions.author = req.query.author;
	}
	// check req.query for filters
	// if there are filters, use them in Model.find query
	Book.find(conditions, (err, books) => {
		if (err) {
			return res.status(500).json({message: err});
		} else {
			return res.status(200).json({books});
		}
	})
}

exports.fetchSingleBook = (req, res) => {
	Book.findOne({_id: req.params.id}, (err, book) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!book) {
			return res.status(404).json({message: "book not found"});
		} else {
			return res.status(200).json({ book });
		}
	})
}

exports.updateSingleBook = (req, res) => {
	Book.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		category: req.body.category
	}, (err, book) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!book) {
			return res.status(404).json({message: "book not found"});
		} else {
			book.save((err, savedBook) => {
				if (err) {
					return res.status(400).json({message: err});
				} else {
					return res.status(200).json({message: "book updated successfully"})
				}
			});
		}
	})
}

exports.deleteSingleBook = (req, res) => {
	Book.findByIdAndDelete(req.params.id, (err, book) => {
		if (err) {
			return res.status(500).json({message: err});
		} else if (!book) {
			return res.status(404).json({message: "book not found"});
		} else {
			return res.status(200).json({message: "book deleted successfully"});
		}
	})
}