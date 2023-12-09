const express = require('express');
const router = express.Router();
const {
    addProduct,
    getProduct,
    getAllProducts,
    getAllProductsByAdmin,
    updateProduct,
    deleteProduct
} = require('../controllers/ProductController');
const {verifyUser} = require('../controllers/RegisterController');

router.get('/getProduct/:id', getProduct);
router.get('/getAllProduct', getAllProducts);
router.get('/getAllProducts/:adminId',verifyUser, getAllProductsByAdmin);
router.post('/addProduct',verifyUser, addProduct);

router.put('/updateProduct/:id',verifyUser, updateProduct);
router.delete('/deleteProduct/:id',verifyUser, deleteProduct);
module.exports = router;

