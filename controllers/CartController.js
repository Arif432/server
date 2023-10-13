const CartModel = require('../models/CartModel')
const ProductModal = require('../models/BooksProductsModal')

const addToCart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { id } = req.params;
        const findProduct = await ProductModal.findById(id);
        if (!findProduct) {
            return res.status(404).json({ error: 'Product does not exist so it can not be added to cart' });
        }
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

const deleteAllFromCart = async (req, res) => {
    try {
        if(!req.user){
            return res.status(401).json({error: 'User not authenticated'})
        }
        const user = req.user._id;
        const cart = await CartModel.findOne({ user: user });
        if(!cart){
            return res.status(404).json({error: 'Cart not found'})
        }
        const updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $set: { products: [] } }, { new: true });
        res.status(200).json({ cart: updatedCart });
    }catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Server error: Unable to delete cart' });
    }
}

const getTotalCartPrice = async (req, res) => {
    try {
        const user = req.user._id;
        const cart = await CartModel.findOne({ user: user });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        let totalPrice = 0;
        for (const product of cart.products) {
           const productPrice = await ProductModal.findById(product).select('price');
              totalPrice += productPrice.price;
        }
        res.status(200).json({ totalPrice });
    } catch (error) {
        console.error('Error getting total cart price:', error);
        res.status(500).json({ error: 'Server error: Unable to get total cart price' });
    }
}

const getCartSize = async (req, res) => {
    try {
        const user = req.user._id;
        const cart = await CartModel.findOne({ user: user });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const cartSize = cart.products.length;
        res.status(200).json({ cartSize });
    } catch (error) {
        console.error('Error getting cart size:', error);
        res.status(500).json({ error: 'Server error: Unable to get cart size' });
    }
}



module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    deleteAllFromCart,
    getTotalCartPrice,
    getCartSize
}