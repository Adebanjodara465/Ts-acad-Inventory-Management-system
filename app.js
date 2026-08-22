//our entry point for the application, this is where we will set up our server and connect to the database
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const productRoute = require ('./Routes/ProductRoute'); //our product route
const userRoute = require('./Routes/UserRoutes'); //our user route

dotenv.config(); //load environment variables from .env file

app.use(express.json()); //our middleware to parse incoming JSON requests

app.use('/products', productRoute);
app.use('/users', userRoute);


const connectDb = require('./Config/databaseConfig'); //our database connection
connectDb(); //connect to the mongodb


app.listen(process.env.PORT, () => { //follow what the env says
    console.log(`Server is running on port ${process.env.PORT}`);
})