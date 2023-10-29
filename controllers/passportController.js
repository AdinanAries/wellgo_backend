const addPassport = (req, res, next) => {
    res.status(200).send("add passport");
}

const getPassport = (req, res, next) => {
    res.status(200).send("get Single Passport");
}

const getPassports = (req, res, next) => {
    res.status(200).send("get all Passports");
}

module.exports = {
    addPassport,
    getPassport,
    getPassports
}