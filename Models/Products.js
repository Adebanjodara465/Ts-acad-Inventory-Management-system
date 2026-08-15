const mongoose = require('mongoose');

//this just contains the properties of the product, we will use this to create a product model in the controller
//na for the controller we dey get to create, update, delete and such for the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
   
},
  {timestamps: true }//date created and updated at}
);

//creating a model for the product schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product; //to alow every other module use it