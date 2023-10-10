const ProductModal = require('../models/BooksProductsModal')
const addProduct = async (req, res) => {
    const { title, author, description, price, isbn } = req.body;  // Include isbn here
    const uploadedBy = req.user._id;
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You are customer please make seller account' });
        }
        const product = await ProductModal.create({ title, author, description, price, uploadedBy, isbn });  // Include isbn here
        res.status(201).json({ uploadedBy: product.uploadedBy, product: product._id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "product with given isbn already exists" });
    }
};
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModal.findById(id);
        if (!product){
            return res.status(404).json({ error: 'Product not found' });
        }
        if (req.user.role !== 'admin' || req.user._id.toString() !== product.uploadedBy.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this product' });
        }
        const deletedProduct = await ProductModal.findByIdAndDelete(id);
        if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found during deletion' });
            }
        res.status(200).json({ message: 'Product deleted successfully' , product: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price, isbn } = req.body;
    console.log(req.user)
    try {
        const product = await ProductModal.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (req.user.role !== 'admin' || req.user._id.toString() !== product.uploadedBy.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this product' });
        }
        const updatedProduct = await ProductModal.findByIdAndUpdate(id, { title, author, description, price, isbn }, { new: true });
        res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModal.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "could not find product" });
    }
}

const getAllProducts = async (req, res) => {
    const { minPrice, maxPrice, ...search } = req.query; // Extract minPrice and maxPrice for filtering
    const priceFilter = {};
    if (minPrice !== undefined) {
        priceFilter.$gte = parseFloat(minPrice);
    }
    if (maxPrice !== undefined) {
        priceFilter.$lte = parseFloat(maxPrice);
    }
    try {
        const products = await ProductModal.find({ ...search, price: priceFilter });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProductsByAdmin = async (req, res) => {
    const { adminId } = req.params;
    const search = req.query; // Query parameters for filtering
    try {
        if (req.user._id.toString() !== adminId) 
            return res.status(403).json({ error: 'You are not authorized to access these products.' });
        const products = await ProductModal.find({ ...search, uploadedBy: adminId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct,
    getAllProducts,
    getAllProductsByAdmin
};