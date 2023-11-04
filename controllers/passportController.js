const addPassport = (req, res, next) => {
    res.status(200).send("add passport");
}

const getPassport = (req, res, next) => {
    res.status(200).send("get Single Passport");
}

const getPassports = (req, res, next) => {
    res.status(200).send([
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
}

module.exports = {
    addPassport,
    getPassport,
    getPassports
}