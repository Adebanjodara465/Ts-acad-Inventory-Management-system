//where we will keep info about our users
//creating user properties, bring in mongodb
const mongoose = require('mongoose');

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
    hasAdminAccess: {
        type: String,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['salesperson', 'admin', 'storekeeper'], //enum means the role can only be either user or admin, one or the other
        default: 'user'
    },
    
},
 {timestamps: true} //date created and updated at
);


//creating a model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User; //to allow every other module use it