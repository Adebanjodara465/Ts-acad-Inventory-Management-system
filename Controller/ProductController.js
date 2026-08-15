const Product = require('../Models/Products'); //importing the product model so the controller fit control am

//create a new product the below is redundant code, we can use the one below it
// const createProduct = async (req, res) => { try {const product = new Product(req.body); await product.save();
//res.status(201).json(product);} catch (error) { res.status(400).json({ message: error.message }); } };   

// module.exports = {createProduct};

//this is a better way to create a product, we can use this one instead of the one above it
exports.createProduct = async (req, res) => {
  try{
    //must do validation to check if all fields are provided
    if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const { name, size, description, price, quantity } = req.body;

    const product = new Product({
        name,
        size,
        description,
        price,
        quantity
    });

       await product.save();
       res.status(201).json({ message: 'Product created successfully', product });
    }    catch (error) {
       res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

//update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product id to be updated
        const { name, size, description, price, quantity } = req.body;

        const product = await Product.findByIdAndUpdate(id, {name, size, description, price, quantity}, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }  
};  

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

//get by id
exports.getProductsById = async (req, res) => {
    try {
        const { id} = req.params; // where id is the product id to be updated
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message});
    }
    };

//delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id); //basically this .find is spelling out the action you want to take, so .findById, .findByIdAndDelete, etc
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};