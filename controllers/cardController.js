const PaymentCard = require("../models/paymentCard");
const asyncHandler = require("express-async-handler");

const addCard = (req, res, next) => {
    const {
        card_number,
        holder_name,
        exp_date,
        sec_code,
        billing,
    } = req.body;
    const card = new PaymentCard({
        user_id: req.user.id,
        card_number: card_number,
        holder_name: holder_name,
        exp_date: exp_date,
        sec_code: sec_code,
        billing: billing,
    });
    card.save().then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error("Server Error:", err.message);
    });
}

const getCard = (req, res, next) => {
    console.log(req.params.id);
    const id=req.params.id;
    PaymentCard.findOne({_id: id})
    .then((card) => {
        res.status(200).send(card);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    });
}

const getCards = (req, res, next) => {
    const user_id=req.user.id;
    PaymentCard.find({user_id: user_id})
    .then((cards) => {
        res.status(200).send(cards);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    });
}

const editCard = asyncHandler(async (req, res, next) => {
    const {
        id,
        card_number,
        holder_name,
        exp_date,
        sec_code,
        billing,
    } = req.body;

    let card = await PaymentCard.findById(id);

    if(!card){
        res.status(400);
        throw new Error("Card not found");
    }

    // Updating card information    
    card.card_number = card_number;
    card.holder_name = holder_name;
    card.exp_date = exp_date;
    card.sec_code = sec_code;
    card.billing = billing;

    const updated_card = new PaymentCard(card);
    updated_card.save().then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error("Server Error:", err.message);
    });
});

const deleteCard = asyncHandler(async (req, res, next) => {
    const {
        id,
        card_number,
        holder_name,
        exp_date,
        sec_code,
    } = req.body;

    let card = await PaymentCard.findOne({
        _id: id,
        user_id: req.user.id,
        card_number: card_number,
        holder_name: holder_name,
        exp_date: exp_date,
        sec_code: sec_code
    });

    if(!card){
        res.status(400);
        throw new Error("Card not found");
    }

    PaymentCard.deleteOne(card).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500);
        throw new Error("Server Error:", err.message);
    });
});

module.exports = { 
    addCard,
    getCard,
    getCards,
    editCard,
    deleteCard
}