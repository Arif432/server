const express = require('express');
const router = express.Router();
const {registerUser,loginUser ,verifyUser,updateUser,deleteUser} = require('../controllers/RegisterController');
const {sendMail}= require('../utils/nodemailerConfig')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
});
router.get('/admin',verifyUser, (req, res) => {
    res.status(200).json('Success');
});
router.put('/updateUser/:id',verifyUser, updateUser);
router.delete('/deleteUser/:id',verifyUser, deleteUser);

router.post('/forgotPassword', async (req, res) => {
    const to = "nawazarif147@gmail.com";
    const subject = "Reset Password";
    const text = "Reset Password";
    const html = "<h3>Reset Password</h3>";
    try {
      await sendMail(to, subject,text, html);
      res.status(200).send("Password reset email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send(error);
    }
  });

module.exports = router;
