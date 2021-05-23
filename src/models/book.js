const mongoose = require('mongoose');
// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true
	},
	author: String,
	description: String,
	category: {
		type: String,
		enum: ["fiction", "non-fiction", "comics", "others"],
		default: "fiction"
	},
	purchaseCount: Number,
	imageUrl: String,
	tags: Array,
	color: String
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;