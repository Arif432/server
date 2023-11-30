const mongoose = require('mongoose');

const GenresSchema = new mongoose.Schema({
    genreName: {
        type: String,
    },
    description: {
        type: String,
    },
    genreImage: {
        type: String,
    },
});

const GenresModel = mongoose.model('genres', GenresSchema);
module.exports = GenresModel;
