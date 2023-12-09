const ProductModal = require('../models/BooksProductsModal')
const AuthorsModel = require('../models/AuthorModel')
const GenreModel = require('../models/GenreModel')

const addProduct = async (req, res) => {
    const { title, authorName, description, price, isbn, quantity, genreName } = req.body;
    const uploadedBy = req.user._id;
    const genreExists = await GenreModel.findOne({ genreName });

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You are a customer. Please create a seller account.' });
        }
        let authorDoc = await AuthorsModel.findOne({ authorName });
        if (!authorDoc) {
            authorDoc = await AuthorsModel.create({ authorName });
        }
        if (!genreExists) {
            return res.status(404).json({ error: 'Genre not found.' });
        }
        const product = await ProductModal.create({
            title,
            authorName: authorDoc._id,
            description,
            price,
            uploadedBy,
            isbn,
            quantity,
            genreName: genreExists._id,
        });

        res.status(201).json({ uploadedBy: product.uploadedBy, product: product._id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while adding the product.' });
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
    const { title, author, description, price, isbn, genre } = req.body;

    try {
        const product = await ProductModal.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (req.user.role !== 'admin' || req.user._id.toString() !== product.uploadedBy.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this product' });
        }

        // Check if the provided author and genre IDs exist in the respective collections
        const authorExists = await AuthorsModel.findById(author);
        const genreExists = await GenresModel.findById(genre);

        if (!authorExists || !genreExists) {
            return res.status(404).json({ error: 'Author or genre not found.' });
        }

        const updatedProduct = await ProductModal.findByIdAndUpdate(id, {
            title,
            author,
            description,
            price,
            isbn,
            genre,
        }, { new: true });

        res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product.' });
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
    let { minPrice, maxPrice, ...search } = req.query; // Extract minPrice and maxPrice for filtering

    // If minPrice is 0, set it to undefined to get all products
    if (minPrice !== undefined && parseFloat(minPrice) === 0) {
        minPrice = undefined;
    }

    const priceFilter = {};
    if (minPrice !== undefined) {
        priceFilter.$gte = parseFloat(minPrice);
    }
    if (maxPrice !== undefined) {
        priceFilter.$lte = parseFloat(maxPrice);
    }
    
    try {
        const products = await ProductModal.find({ ...search, ...(minPrice || maxPrice ? { price: priceFilter } : {}) });
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