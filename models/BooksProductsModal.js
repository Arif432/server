const mongoose = require('mongoose');

const BooksProductsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    averageRating: {
        type: Number,
        default: 0  // Default to 0 if no ratings yet
    },
    language: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    isbn: {
        type: String,
        unique: true,
    },
    reviews: [{
        reviewerName: String,
        reviewText: String,
        rating: Number
    }],
    images: [{
        type: String  // Assuming you'll store image URLs
    }],
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  // Reference to the 'users' collection (UserModal)
    }
});
const BooksProductsModal = mongoose.model('products', BooksProductsSchema);
module.exports = BooksProductsModal;
