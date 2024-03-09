// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51OdjZ3An0YMgH2TtcRebcqghzoyfEnf0Ezuo0HKbCvFDcSE2ECddCbGMddcCF5r5incz85NVn43mG5KkPSK9pgzh00E966NRQz');
const { send_email } = require('../helpers/Email');
const constants = require("../constants");

const getSecret = async (req, res, next) => {
    try{
        let _amount = ((parseFloat(req?.body?.amount).toFixed(0))*100);
        let _currency = req?.body?.currency || 'usd';
        const paymentIntent = await stripe.paymentIntents.create({
            amount: _amount,
            currency: _currency,
            automatic_payment_methods: {
                enabled: true,
            },
            payment_method_options: {
                card: {
                    capture_method: 'manual',
                },
            }
        });

        //Send email to admins
        const msg = {
            to: constants.email.admins_to,
            from: constants.email.automated_from,
            subject: "Welldugo - New Payment Intent Created",
            text: "New Payment Intent Details Below:\n",
            html: JSON.stringify(paymentIntent),
        };
        send_email(msg);

        res.json(paymentIntent);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: true,
            message: "Server Error"
        })
    }
}

const getIntentDetailsById = async (req, res, next) => {
    try{
        const paymentIntent = await stripe.paymentIntents.retrieve(
            (req?.params?.id || "")
        );
        if(paymentIntent?.id){
            res.status(201).send(paymentIntent);
            return;
        }else{
            res.status(401).send({message: "intent no found"});
            return;
        }
    } catch (e) {
        res.status(500).send({message: "Server Error!"});
    }
}

const updateIntentAmount = async (req, res, next) => {
    try{
        let _amount = ((parseFloat(req?.body?.amount).toFixed(0))*100);
        let _currency = req?.body?.currency || 'usd';
        let _id = req?.body?.id;
        const paymentIntent = await stripe.paymentIntents.update(
            _id,
            {
                amount: _amount,
                currency: _currency,
            }
        );
        res.status(201).send(paymentIntent);
    }catch(e){
        console.log(e);
        res.status(500).send({message: "Server Error"});
    }

}

module.exports = {
    getSecret,
    getIntentDetailsById,
    updateIntentAmount,
}