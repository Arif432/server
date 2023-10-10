const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/UserModal')

const registerUser = async (req, res) => {
    const { name, email, password, avatar } = req.body; // Extracting avatar from the request body
    try {
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password should be at least 6 characters' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModal.create({ name, email, password: hashedPassword, avatar }); // Including avatar in user creation
        res.status(201).json({ user: user._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModal.findOne({ email });
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                // console.log("user", user)
                // const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: 3600 });
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 3600 });
                res.cookie('token', token);
                res.json({ role: user.role, token });
            } else {
                res.status(401).json({ error: 'Invalid password.' });
            }
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error finding user.' });
    }
};

const verifyUser = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ msg: 'Authorization token missing' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Invalid token' });
            } else {
                req.user = {
                    _id: decoded._id,
                    role: decoded.role
                };
                next();
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying user.' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, avatar } = req.body;
    try {
        if (req.user._id.toString() !== id) {
            return res.status(403).json({ error: 'You are not authorized to update this user' });
        }
        const updatedUser = await UserModal.findByIdAndUpdate(id, { name, email, password, avatar }, { new: true });
        res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModal.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found during deletion' });
        }
        if (req.user._id.toString() !== id) {
            return res.status(403).json({ error: 'You are not authorized to delete this user' });
        }
        res.status(200).json({ msg: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    updateUser,
    deleteUser
};

