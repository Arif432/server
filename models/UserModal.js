const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type : String, 
        required : true,
        minlength: [3, 'Name should be at least 3 characters'],
        maxlength: [10, 'Name should be at most 10 characters'],
        unique: [true, 'username already exists']
    },
    email: {
        type:String,
        required:true,
        unique:[true,'Email already exists'],
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password should be at least 6 characters']
    },
    role : {
        type: String,
        default: 'customer'
    },
});

const UserModal = mongoose.model('users', UserSchema);
module.exports = UserModal;