
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const CartModal = mongoose.model('carts', CartSchema);
module.exports = CartModal;