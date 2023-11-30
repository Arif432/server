const mongoose = require('mongoose');

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    introduction: {
        type: String,
    },
    authorImage: {
        type: String,
    },
});

const AuthorsModel = mongoose.model('authors', AuthorsSchema);
module.exports = AuthorsModel;
