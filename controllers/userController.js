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

    res.status(200).send(req.body);
}

const login = (req, res, next) => {
    const {email, password } = req.body;
    console.log('email:', email);
    console.log('password:', password);
    res.status(200).send({status: true});
}

const getUserDetails = (req, res, next) => {
    console.log(req.params.id);
    let usr = {
        first_name: "John",
        middle_name: "Doe",
        last_name: "Driven",
        dob: "1992-03-23",
        gender: "male",
        phone: "+17327999546",
        email: "johndoe@email.com"
    }
    res.status(200).send(usr);
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