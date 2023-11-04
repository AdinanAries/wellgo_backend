const User = require('../models/user'); 

const signup = (req, res, next) => {
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
    const user = new User({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        password: password
    });
    user.save().then((result) => {
        console.log(result);
        console.log("data");
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    });
}

const login = (req, res, next) => {
    const {email, password } = req.body;
    console.log('email:', email);
    console.log('password:', password);
    res.status(200).send({status: true});
}

/**
 * 
 * {
        id: "001",
        first_name: "Mohammedu",
        middle_name: "",
        last_name: "Adinan",
        dob: "03-23-1992",
        email: "m.adinan@yahoo.com",
        mobile: "+1 7327999546",
        gender: "male"
    }
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const getUserDetails = (req, res, next) => {
    console.log(req.params.id);
    const id=req.params.id;
    User.findOne({_id: id})
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    });
    /*let usr = {
        first_name: "John",
        middle_name: "Doe",
        last_name: "Driven",
        dob: "1992-03-23",
        gender: "male",
        phone: "+17327999546",
        email: "johndoe@email.com",
        password: "password"
    }*/  
}

const updateUserDetails = (req, res, next) => {
    console.log(req.body);
    res.status(200).send(req.body);
}

module.exports = {
    getUserDetails,
    login,
    signup,
    updateUserDetails
}