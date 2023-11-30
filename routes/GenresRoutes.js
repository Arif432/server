
const express = require('express');
const { verifyUser } = require('../controllers/RegisterController');
const router = express.Router();
const {getAllGenres,getSingleGenre,deleteGenre,updateGenre, createGenre} = require('../controllers/GenreController');

// router.use(verifyUser);
router.put('/updateGenre/:id', updateGenre);
router.get('/getAllGenre', getAllGenres);
router.get('/getSingleGenre/:id', getSingleGenre);
router.post('/postGenre', createGenre);
router.delete('/deleteGenre/:id', deleteGenre);
module.exports = router;