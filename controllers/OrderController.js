const OrderModal = require('../models/OrderModel');

const addOrder = async (req, res) => {
    const { products } = req.body;
    const user = req.user._id;
    try {
        const order = await OrderModal.create({ user: user, products: products });
        res.status(201).json({ order: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getOrders = async (req, res) => {
    const user = req.user._id;
    try {
        const orders = await OrderModal.find({ user: user }).populate('products');
        res.status(200).json({ orders: orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const user = req.user._id;
    try {
        const order = await OrderModal.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (req.user.role !== 'admin' || req.user._id.toString() !== order.user.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this order' });
        }
        const deletedOrder = await OrderModal.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found during deletion' });
        }
        res.status(200).json({ message: 'Order deleted successfully', order: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await OrderModal.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        if (req.user.role !== 'admin' || req.user._id.toString() !== order.user.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this order' });
        }
        const updatedOrder = await OrderModal.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ msg: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addOrder,
    getOrders,
    deleteOrder,
    updateOrder
}