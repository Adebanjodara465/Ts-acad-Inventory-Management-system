//where we will keep info about our users
//creating user properties, bring in mongodb
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], //??
        default: 'user'
    },
    timestamp: true //date created and updated at
});


//creating a model for the user schema
const User = mongoose.model('User', userSchema);