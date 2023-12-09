const mongoose = require('mongoose');

const BooksProductsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    authorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'  // Reference to the 'authors' collection
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    averageRating: {
        type: Number,
        default: 0
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
        type: String
    }],
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    genreName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genres'  // Reference to the 'genres' collection
    }
});

const BooksProductsModal = mongoose.model('products', BooksProductsSchema);
module.exports = BooksProductsModal;
