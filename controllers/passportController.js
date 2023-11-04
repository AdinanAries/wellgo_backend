const Passport = require('../models/passport');

const addPassport = (req, res, next) => {
    const {
        user_id,
        passport_number,
        issue_date,
        exp_date,
        city,
        country,
        holder_name,
        holder_gender,
        holder_nationality,
        holder_dob,
        holder_birth_city 
    } = req.body;
    const passport = new Passport({
        user_id: user_id,
        passport_number: passport_number,
        issue_date: issue_date,
        exp_date: exp_date,
        city: city,
        country: country,
        holder_name: holder_name,
        holder_gender: holder_gender,
        holder_nationality: holder_nationality,
        holder_dob: holder_dob,
        holder_birth_city: holder_birth_city 
    });
    passport.save().then((result) => {
        console.log("-----------------PASSPORT----------------");
        console.log(result);
        console.log("-----------------PASSPORT----------------");
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("PASSPORT ERROR!");
    });
}

const getPassport = (req, res, next) => {
    console.log(req.params.id);
    const id=req.params.id;
    Passport.findOne({_id: id})
    .then((passport) => {
        res.status(200).send(passport);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
}

const getPassports = (req, res, next) => {
    const user_id=req.params.user_id;
    Passport.find({user_id: user_id})
    .then((passports) => {
        res.status(200).send(passports);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
    /*res.status(200).send([
        {
            id: "001",
            user_id: "001",
            passport_number: "3452342",
            issue_date: "02-26-2022",
            exp_date: "02-26-2026",
            city: "New York",
            country: "United States",
            holder_name: "Mohammed Adinan",
            holder_gender: "Male",
            holder_nationality: "American",
            holder_dob: "03-23-1992",
            holder_birth_city: "New York"
        },
        {
            id: "002",
            user_id: "001",
            passport_number: "436373",
            issue_date: "03-19-2021",
            exp_date: "03-19-2025",
            city: "New York",
            country: "United States",
            holder_name: "Salis Munir",
            holder_gender: "Male",
            holder_nationality: "American",
            holder_dob: "03-23-1992",
            holder_birth_city: "New York"
        }
    ]);
    // res.send([]);*/
}

module.exports = {
    addPassport,
    getPassport,
    getPassports
}