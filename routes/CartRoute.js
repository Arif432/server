
const express = require('express');
const router = express.Router();
const {addToCart,removeFromCart,getCart,deleteAllFromCart,getTotalCartPrice,getCartSize} = require('../controllers/CartController');
const { verifyUser } = require('../controllers/RegisterController');

router.post('/addToCart/:id',verifyUser,addToCart);
router.get('/getCart',verifyUser,getCart);
router.get('/getTotalCartPrice',verifyUser,getTotalCartPrice);
router.get('/getCartSize',verifyUser,getCartSize);
router.delete('/removeFromCart/:id',verifyUser,removeFromCart);
router.delete('/deleteAllFromCart',verifyUser,deleteAllFromCart);
module.exports = router;
