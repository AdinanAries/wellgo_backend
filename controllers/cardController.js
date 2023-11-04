const addCard = (req, res, next) => {
    res.status(200).send("Add Payment Card");
}

const getCard = (req, res, next) => {
    res.status(200).send("Get Payment Card");
}

const getCards = (req, res, next) => {
    res.status(200).send([
        {
            id: "001",
            user_id: "001",
            card_number: "***3424",
            holder_name: "Mohammed Adinan",
            exp_date: "03-23-2025",
            sec_code: "009",
            billing: {
                street: "956 Anderson Ave, 1A",
                city: "Bronx",
                state: "NY",
                country: "United States",
                zip_code: "10453"
            }
        },
        {
            id: "001",
            user_id: "001",
            card_number: "***4532",
            holder_name: "Emmanuel Poku",
            exp_date: "06-19-2025",
            sec_code: "136",
            billing: {
                street: "956 Anderson Ave, 1A",
                city: "Bronx",
                state: "NY",
                country: "United States",
                zip_code: "10453"
            }
        }
    ]);
}

module.exports = { 
    addCard,
    getCard,
    getCards
}