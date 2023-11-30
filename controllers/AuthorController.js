const AuthorsModel = require('../models/AuthorModel')

const createAuthor = async (req, res) => {
    const { name, introduction, authorImage } = req.body;
    try {
        const author = await AuthorsModel.create({ name, introduction, authorImage });
        res.status(201).json({ message: 'Author created successfully', author });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the author.' });
    }
};

const getAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await AuthorsModel.findById(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found.' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the author.' });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorsModel.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving authors.' });
    }
};

const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, introduction, authorImage } = req.body;

    try {
        const updatedAuthor = await AuthorsModel.findByIdAndUpdate(
            id,
            { name, introduction, authorImage },
            { new: true }
        );
        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Author not found.' });
        }
        res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the author.' });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAuthor = await AuthorsModel.findByIdAndDelete(id);
        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Author not found.' });
        }
        res.status(200).json({ message: 'Author deleted successfully', author: deletedAuthor });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the author.' });
    }
};

module.exports = {
    createAuthor,
    getAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor,
};
