const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
} = require('../controllers/AuthorController')

router.get('/getAllAuthors', getAllAuthors);
router.get('/getSingleAuthor/:id',  getAuthor);
router.post('/postAuthor', createAuthor);
router.put('/updateAuthor/:id', updateAuthor);
router.delete('/deleteAuthor/:id', deleteAuthor);

module.exports = router;
