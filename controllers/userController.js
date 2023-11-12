const User = require('../models/user'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

/**
 * @desc Registers new user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Public
 */
const signup = asyncHandler(async (req, res, next) => {
    const {
        password,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        email
    } = req.body;

    if(!first_name || !last_name || !email || !password ){
        res.status(400);
        throw new Error('Please add mandatory user fields');
    }

    // Check if user exists
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already exist');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        password: hashedPassword
    });
    user.save().then((result) => {
        console.log(result);
        res.status(201).send({
            _id: result._id,
            first_name: result.first_name,
            middle_name: result.middle_name,
            last_name: result.last_name,
            dob: result.dob,
            phone: result.phone,
            email: result.email,
            password: result.password,
            token: generateToken(result._id)
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error('User could not be created');
    });
})

/**
 * @desc User login
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
    const {email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('Please provide user credentials');
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).send({
            _id: user._id,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            dob: user.dob,
            phone: user.phone,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid Login Credentials');
    }
})

/**
 * @desc Get currently logged-in user information from MongoDB
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getUserDetails = (req, res, next) => {
    const id=req.user.id;
    User.findOne({_id: id})
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
}

/**
 * @desc Updating user account information
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const updateUserDetails = asyncHandler( async (req, res, next) => {
    const {
        password,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        email
    } = req.body;

    console.log(req.body);

    if(!first_name || !last_name || !email ){
        res.status(400);
        throw new Error('Please add mandatory user fields');
    }

    // Check if user exists
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    // Update user
    user.first_name=first_name;
    user.middle_name=middle_name;
    user.last_name=last_name;
    user.dob=dob;
    user.gender=gender;
    user.phone=phone;
    user.email=email;
    user.password=password;

    const user_updated = new User(user);
    user_updated.save().then((result) => {
        console.log(result);
        res.status(201).send({
            _id: result._id,
            first_name: result.first_name,
            middle_name: result.middle_name,
            last_name: result.last_name,
            dob: result.dob,
            phone: result.phone,
            email: result.email,
            password: result.password,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error('User could not be updated');
    });
});

/**
 * @desc Changes user password
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const updateUserPassword = asyncHandler( async (req, res, next) => {
    const {
        new_password,
        old_password,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        email
    } = req.body;

    if(!new_password || !old_password){
        res.status(400);
        throw new Error("Either your old password or the new one or both are have not been provided");
    }

    if(new_password===old_password){
        res.status(400);
        throw new Error("Both old and new passwords are the same");
    }

    if(!first_name || !last_name || !email ){
        res.status(400);
        throw new Error('Please add mandatory user fields');
    }

    // Check if user exists
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    if((await bcrypt.compare(old_password, user.password))){
        // old password is correct!
    } else {
        res.status(400);
        throw new Error('Please make sure your old password is correct');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update user password
    user.password=hashedPassword;

    const user_updated = new User(user);
    user_updated.save().then((result) => {
        console.log(result);
        res.status(201).send({
            _id: result._id,
            first_name: result.first_name,
            middle_name: result.middle_name,
            last_name: result.last_name,
            dob: result.dob,
            phone: result.phone,
            email: result.email,
            password: result.password,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error('Password could not be changed');
    });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETE, {
        expiresIn: "14d"
    });
}

module.exports = {
    getUserDetails,
    login,
    signup,
    updateUserDetails,
    updateUserPassword
}