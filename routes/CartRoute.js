
const express = require('express');
const router = express.Router();
const {addToCart,removeFromCart,getCart} = require('../controllers/CartController');
const { verifyUser } = require('../controllers/RegisterController');

router.post('/addToCart/:id',verifyUser,addToCart);
router.delete('/removeFromCart/:id',verifyUser,removeFromCart);
router.get('/getCart',verifyUser,getCart);
module.exports = router;
