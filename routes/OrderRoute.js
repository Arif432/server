
const express = require('express');
const router = express.Router();
const {addOrder,updateOrder,getOrders,deleteOrder} = require('../controllers/OrderController');
router.post('/addOrder',addOrder);
router.put('/updateOrder/:id',updateOrder);
router.get('/getOrders',getOrders);
router.delete('/deleteOrder/:id',deleteOrder);
module.exports = router;