const express = require('express');
const router = express.Router();
const BookCtrl = require('../controllers/bookControllers');
const {authenticateUser} = require('../middlewares/authentication');

// POST request to /books to create a new book
router.post('/books', BookCtrl.createNewBook);	
// GET request to /books to fetch all books
router.get('/books', authenticateUser, BookCtrl.fetchBooks);
// GET request to /books/:id to fetch single book
router.get('/books/:id', BookCtrl.fetchSingleBook);
// PUT request to /books/:id to update single book
router.put('/books/:id', BookCtrl.updateSingleBook);
// DELETE request to /books/:id to delete
router.delete('/books/:id', BookCtrl.deleteSingleBook);

module.exports = router;

