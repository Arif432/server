const GenresModel = require('../models/GenreModel');

const createGenre = async (req, res) => {
    const { genreName, description, genreImage } = req.body;

    try {
        const genre = await GenresModel.create({ genreName, description, genreImage });
        res.status(201).json({ message: 'Genre created successfully', genre });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the genre.' });
    }
};

const getSingleGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const genre = await GenresModel.findById(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found.' });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the genre.' });
    }
};

const getAllGenres = async (req, res) => {
    try {
        const genres = await GenresModel.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving genres.' });
    }
};

const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { genreName, description, genreImage } = req.body;

    try {
        const updatedGenre = await GenresModel.findByIdAndUpdate(
            id,
            { genreName, description, genreImage },
            { new: true }
        );

        if (!updatedGenre) {
            return res.status(404).json({ error: 'Genre not found.' });
        }

        res.status(200).json({ message: 'Genre updated successfully', genre: updatedGenre });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the genre.' });
    }
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGenre = await GenresModel.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).json({ error: 'Genre not found.' });
        }

        res.status(200).json({ message: 'Genre deleted successfully', genre: deletedGenre });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the genre.' });
    }
};

module.exports = {
    createGenre,
    getSingleGenre,
    getAllGenres,
    updateGenre,
    deleteGenre,
};
