const addCard = (req, res, next) => {
    res.status(200).send("Add Payment Card");
}

const getCard = (req, res, next) => {
    res.status(200).send("Get Payment Card");
}

const getCards = (req, res, next) => {
    res.status(200).send("Get All Payment Cards");
}

module.exports = { 
    addCard,
    getCard,
    getCards
}