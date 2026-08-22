const express = require('express');
const router = express.Router();

//import the user controller
const userController = require('../Controller/UserController');


//define the routes-pointing out the individual methods we created in our controller
router.post('/createuser', userController.createUser);

router.post('/loginuser', userController.loginUser);

//exporting the router
module.exports = router;