const CartModel = require('../models/CartModel')
const addToCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { id } = req.params;
        const user = req.user._id;
        const cart = await CartModel.findOne({ user: user });
        if (!cart) {
            const newCart = await CartModel.create({ user: user, products: [id] });
            res.status(201).json({ cart: newCart });
        } else {
            const updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $push: { products: id } }, { new: true });
            res.status(200).json({ cart: updatedCart });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error: Unable to add to cart' });
    }
}

const removeFromCart = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { id } = req.params;
        const user = req.user._id;

        const cart = await CartModel.findOne({ user: user });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $pull: { products: id } }, { new: true });
        res.status(200).json({ cart: updatedCart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Server error: Unable to remove from cart' });
    }
}

const getCart = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user = req.user._id;
        const cart = await CartModel.findOne({ user: user }).populate('products');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json({ cart: cart });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ error: 'Server error: Unable to get cart' });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart
}