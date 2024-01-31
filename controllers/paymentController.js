// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51OdjZ3An0YMgH2TtcRebcqghzoyfEnf0Ezuo0HKbCvFDcSE2ECddCbGMddcCF5r5incz85NVn43mG5KkPSK9pgzh00E966NRQz');

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
        });
        res.json({client_secret: paymentIntent.client_secret});
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: true,
            message: "Server Error"
        })
    }
}

module.exports = {
    getSecret,
}