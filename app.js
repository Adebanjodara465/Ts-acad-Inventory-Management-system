//our entry point for the application, this is where we will set up our server and connect to the database
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./Config/databaseConfig'); //our database connection
const productRoute = require ('./Routes/ProductRoute'); //our route

dotenv.config(); //load environment variables from .env file
connectDb(); //connect to the mongodb

const app = express();
app.use(express.json()); //our middleware to parse incoming JSON requests

app.use('/products', productRoute);

app.listen(process.env.PORT, () => { //follow what the env says
    console.log(`Server is running on port ${process.env.PORT}`);
})