const express = require('express');

//import authenication middleware
const { protect } = require('../Middleware/auth');

//importing the role authorization middleware
const { authorise } = require('../Middleware/role');

const router = express.Router(); //router holds all the routes we need

//import the product controller
const productController = require('../Controller/ProductController');


//define the routes-pointing out the individual methods we created in our controller
router.post('/createproduct', protect, authorise('admin'), productController.createProduct); //adding auth here

router.put('/updateproduct/:id', protect, authorise('admin'), productController.updateProduct);

router.get('/getallproducts', protect, productController.getAllProducts);
 
                   //na the same thing wey we write for product controller we go use here,
router.get('/getproducts/:id', protect, productController.getProductsById) // the only difference be say we dey use the router to point to the controller

router.delete('/deleteproduct/:id', protect, authorise('admin'), productController.deleteProduct); //be like say anything wey enter product controller go get en own route
//exporting the router
module.exports = router;