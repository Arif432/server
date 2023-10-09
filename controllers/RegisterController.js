const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/UserModal')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password should be at least 6 characters' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModal.create({ name, email, password: hashedPassword });
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
                // res.status(200).json({ user: user._id });
                console.log("user", user)
                const token = jwt.sign({email:user.email , role:user.role }, process.env.JWT_SECRET,{expiresIn: 3600});
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

const verifyUser = (req,res,next) => {
    const token =  req.headers['token'] ;
    console.log('Token in cookie:', token);

    if (!token) return res.json({msg:'Missing token'});
    try {
        jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
               return res.json('tOKEN error.');
            }
            else{
               if(decoded.role === "admin"){
                   next();
               }
               else{
                return res.json('You are not admin');
               }
            }   
        });
    }catch (error) {
        res.status(500).json({error: 'Error verifying user.'});
    }
}
module.exports = {
    registerUser,
    loginUser,
    verifyUser,
 
};

