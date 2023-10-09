const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes'); // Assuming correct path
require('dotenv').config();
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',  // Adjust this to your frontend's URL
}));

const mongodbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use('/user', userRoutes);
app.listen(PORT, () => {
    console.log('Server started at port:', PORT);
});
