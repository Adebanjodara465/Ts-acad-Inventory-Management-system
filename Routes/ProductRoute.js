const express = require('express');
const router = express.Router(); //router holds all the routes we need

//import the product controller
const productController = require('../Controller/ProductController');


//define the routes-pointing out the individual methods we created in our controller
router.post('/createproduct', productController.createProduct);

router.put('/updateproduct/:id', productController.updateProduct);

router.get('/getallproducts', productController.getAllProducts);
 
                   //na the same thing wey we write for product controller we go use here,
router.get('/getproducts/:id', productController.getProductsById) // the only difference be say we dey use the router to point to the controller

router.delete('/deleteproduct/:id', productController.deleteProduct); //be like say anything wey enter product controller go get en own route
//exporting the router
module.exports = router;