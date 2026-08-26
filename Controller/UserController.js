const User = require('../Models/Users'); //bring in your user model
const bcrypt = require('bcryptjs'); //puting my bcrypt here

//create a new user
exports.createUser = async (req, res) => {
    try{
        //our request body
        const { name, email, password, gender, hasAdminAccess, phone, role } = req.body;

        //must do validation to check if all fields are provided
        if (!name || !email || !password || !gender ||!phone ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //doing an email check
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        //phone number check
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exsits' });
        } 

    //encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

//new user creation
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        gender: req.body.gender,
        hasAdminAccess: req.body.hasAdminAccess || false,
        phone: req.body.phone,
        role: req.body.role || 'user' 
    });

     await user.save();
       res.status(201).json({ message: 'User created successfully', user });
    }    catch (error) {
       res.status(500).json({ message: 'Error creating user', error: error.message });
    }

};


//LOGIN USER
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if all required fields are provided
        if (!email || !password) {
            return re.status(400).json({ message: 'Please provide all required fields'});
        }

        //check if user exists
        const user = await User.findOne({ email});
        if(!user) {
            return res.status(404).json({ message: 'Invalid email or password'});
        }

        //check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password'}) //no dey tell random people wetin you dey find for database
        }

        //generate a jwt token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expires: '1h'});

        res.status(200).json({ message: 'Login successful', token});
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message});
    }
};
