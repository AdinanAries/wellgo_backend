const PaymentCard = require("../models/paymentCard");

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
        console.log("-----------------PAYMENT CARD----------------");
        console.log(result);
        console.log("-----------------PAYMENT CARD----------------");
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("PAYMENT CARD ERROR!");
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
    /*res.status(200).send([
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
    ]);*/
}

module.exports = { 
    addCard,
    getCard,
    getCards
}