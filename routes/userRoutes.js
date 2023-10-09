const express = require('express');
const router = express.Router();
const { registerUser,loginUser ,verifyUser} = require('../controllers/RegisterController');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admin',verifyUser, (req, res) => {
    res.status(200).json('Success');
});
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
