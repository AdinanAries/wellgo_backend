const User = require('../models/user');
const PriceAlertSubscriber = require("../models/priceAlertSubscriber");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const { send_email } = require('../helpers/Email');
const constants = require('../constants');

/**
 * @desc Registers new user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @access Public
 */
const signup = asyncHandler(async (req, res, next) => {
    try{
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

        if(!first_name || !last_name || !email || !password || !phone ){
            res.status(400);
            res.send({message: "Please add mandatory user fields"});
        }

        // Check if user exists
        const userExists = await User.findOne({email});

        if(userExists) {
            res.status(400);
            res.send({message: "User already exist"});
            return;
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
            res.send({message: 'User could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

/**
 * @desc User login
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
    try{
        const {email, password } = req.body;

        if(!email || !password){
            res.status(400);
            res.send({message: "Please provide user credentials"});
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
            res.send({message: "Invalid Login Credentials"});
        }
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
        //throw new Error("Server error");
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
        res.status(500).send({message: "Server Error"});
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
    try{
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
            res.send({message: 'Please add mandatory user fields'});
        }

        // Check if user exists
        const user = await User.findById(req.user.id);

        if(!user) {
            res.status(400);
            res.send({message: 'User does not exist'});
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
            res.send({message: 'User could not be updated'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

/**
 * @desc Changes user password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @access Private
 */
const updateUserPassword = asyncHandler( async (req, res, next) => {
    try{
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
            res.send({message: "Either your old password or the new one or both are have not been provided"});
        }

        if(new_password===old_password){
            res.status(400);
            res.send({message: "Both old and new passwords are the same"});
        }

        if(!first_name || !last_name || !email ){
            res.status(400);
            res.send({message: 'Please add mandatory user fields'});
        }

        // Check if user exists
        const user = await User.findById(req.user.id);

        if(!user) {
            res.status(400);
            res.send({message: 'User does not exist'});
        }

        if((await bcrypt.compare(old_password, user.password))){
            // old password is correct!
        } else {
            res.status(400);
            res.send({message: 'Please make sure your old password is correct'});
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
            res.send({message: 'Password could not be changed'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

/**
 * @desc Add new user subscribtion for price alerts
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @access Public
 */
const subScribeToPriceAlerts = asyncHandler( async (req, res, next) => {
    try{
        const {
            client,
            email
        } = req.body;

        // Check if subscriber exists
        const subscriberExists = await PriceAlertSubscriber.findOne({email});
        if(subscriberExists) {
            res.status(400);
            res.send({status: 400, message: "Subscriber already exist"});
            return;
        }

        // Register subscriber
        const subscriber = new PriceAlertSubscriber({
            client: client,
            email: email
        });
        subscriber.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                client: result.client,
                email: result.email
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Subscriber not be saved'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }

});

/**---------------Start Pasword Reset --------------*/

const resetPasswordRequestController = async (req, res, next) => {

  console.log(req.body);
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    res.send({isSuccess: false, message: 'User does not exist'});
    return;
  }

  let token = await Token.findOne({ userId: user._id });
  if(token)
    await token.deleteOne();

  // Generate Random Token
  let resetToken = crypto.randomBytes(32).toString("hex");
  // Hash resetToken
  const salt = await bcrypt.genSalt(10);
  const hashedResetToken = await bcrypt.hash(resetToken, salt);

  await new Token({
    userId: user._id,
    token: hashedResetToken,
    createdAt: Date.now(),
  }).save();

  const link = `${constants.client_url}/password-reset?token=${resetToken}&id=${user._id}`;

  const msg = {
      to: user.email,
      from: constants.email.automated_from,
      subject: "Welldugo - Password Reset Request",
      text: `Dear ${user.name},`,
      html: `<p>You have requested password reset.</p>
              <p>Please click on the following link in order to reset your password.</p>
              <p><a href="${link}" />${link}</a></p>`,
  };

  const email_res = await send_email(msg);
  res.send({isSuccess: true, passwordResetLink: link});
};

const resetPasswordController = async (req, res, next) => {

  const userId = req.body.userId;
  const token = req.body.token;
  const password = req.body.password;

  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    res.status(400);
    res.send({isSuccess: false, message:"Invalid or expired password reset token"});
    return;
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    res.status(400);
    res.send({isSuccess: false, message:"Invalid or expired password reset token"});
    return;
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  const msg = {
      to: user.email,
      from: constants.email.automated_from,
      subject: "Welldugo - Password Changed",
      text: `Dear ${user.name},`,
      html: `<p>Your Password has been reset successfully!</p>`,
  };

  const email_res = await send_email(msg);
  await passwordResetToken.deleteOne();
  res.send({isSuccess: true, message: "Password has been reset successfully"});
};
/**---------------End Pasword Reset --------------*/

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
    updateUserPassword,
    subScribeToPriceAlerts,
    /**Start Pasword Reset */
    resetPasswordRequestController,
    resetPasswordController,
}
