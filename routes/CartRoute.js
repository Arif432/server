
const express = require('express');
const router = express.Router();
const {addToCart,removeFromCart,getCart,deleteAllFromCart,getTotalCartPrice,getCartSize} = require('../controllers/CartController');
const { verifyUser } = require('../controllers/RegisterController');

router.use(verifyUser);
router.post('/addToCart/:id',addToCart);
router.get('/getCart',getCart);
router.get('/getTotalCartPrice',getTotalCartPrice);
router.get('/getCartSize',getCartSize);
router.delete('/removeFromCart/:id',removeFromCart);
router.delete('/deleteAllFromCart',deleteAllFromCart);
module.exports = router;
