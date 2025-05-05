const constants = require("../constants");
const stripe = require('stripe')('sk_test_51OdjZ3An0YMgH2TtcRebcqghzoyfEnf0Ezuo0HKbCvFDcSE2ECddCbGMddcCF5r5incz85NVn43mG5KkPSK9pgzh00E966NRQz');

// Import application helpers
const { return_flight_search_obj, return_duffel_order_payload  } = require("../helpers/construct_search_obj");
const { setBookingIntentStatuses } = require("../helpers/general");
const { markup, get_price_markup_percentage } = require("../helpers/Prices");
const { send_email } = require('../helpers/Email');
const { make_post_request } = require("../fetch_request/fetch_request");
const { getOcApiHost }  = require("../environment");

/**
 * @desc Get list of flights from data provider
 * @path POST /api/flights/
 * @access private
 * @type controller
 */
const get_flights = async(req, res, next)=>{
    //console.log(req.body.activity);
    //console.log(return_flight_search_obj(req.body));
    //console.log("Currency:", req.body.currency);
    let offer_list;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            let offer_request = await require("../flight_providers/duffel").createOfferRequest(return_flight_search_obj(req.body));
            offer_list = await require("../flight_providers/duffel").listOffers(offer_request.data.id);
            //Agent Activity
            if(offer_list?.data?.length>0){
                if(req?.body?.activity?.oc_user_id){
                    let path = (req?.body?.activity?.booking_link_id
                        ? "\\api\\wallets\\agent\\transaction\\visited-link\\create\\"
                        : "\\api\\wallets\\agent\\transaction\\create\\"
                     )
                    let url = (getOcApiHost()+path);
                    let _activity_res = await make_post_request(
                        url,
                        (req?.body?.activity || {})
                    );
                    console.log(_activity_res);
                }
            }
            res.status(200).json(offer_list);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @desc Lists all flight offers for a selected offer request
 * @path POST /api/flights/list/offers/
 * @access private
 * @type controller
 */
const list_flight_offers = async (req, res, next) => {
    let offer_list;
    let payload=req.body;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offer_list = await require("../flight_providers/duffel").listOffers(payload.id);
            //Agent Activity
            if(offer_list?.data?.length>0){
                if(req?.body?.activity?.oc_user_id){
                    let path = (req?.body?.activity?.booking_link_id
                        ? "\\api\\wallets\\agent\\transaction\\visited-link\\create\\"
                        : "\\api\\wallets\\agent\\transaction\\create\\"
                     )
                    let url = (getOcApiHost()+path);
                    let _activity_res = await make_post_request(
                        url,
                        (req?.body?.activity || {})
                    );
                    console.log(_activity_res);
                }
            }
            res.status(200).json(offer_list);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @desc Post Version: Get complete, up-to-date information about an offer
 * @path POST /api/flights/offers/:id
 * @access private
 * @type controller
 */
const get_offer_info_post_func = async (req, res, next) => {
    let offer;
    let id = req.params.id;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offer = await require("../flight_providers/duffel").getOffer(id);
            //Agent Activity
            if(offer){
                if(req?.body?.activity?.oc_user_id){
                    let path = (req?.body?.activity?.booking_link_id
                        ? "\\api\\wallets\\agent\\transaction\\visited-link\\create\\"
                        : "\\api\\wallets\\agent\\transaction\\create\\"
                     )
                    let url = (getOcApiHost()+path);
                    let _activity_res = await make_post_request(
                        url,
                        (req?.body?.activity || {})
                    );
                    console.log(_activity_res);
                }
            }
            res.status(200).json(offer);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @desc Get complete, up-to-date information about an offer
 * @path GET /api/flights/offers/:id
 * @access private
 * @type controller
 */
const get_offer_info = async (req, res, next) => {
    let offer;
    let id = req.params.id;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offer = await require("../flight_providers/duffel").getOffer(id);
            res.status(200).json(offer);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @desc Create flight order to book the flight
 * @path POST /api/flights/orders/create/
 * @access private
 * @type controller
 */
const create_flight_order = async (req, res, next) => {
    let pi = req?.body?.meta?.paymentIntent;
    let bi = req?.body?.meta?.bookingIntent;
    let fees = req?.body?.meta?.totalFees;
    let flight_order;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            
            let payload = return_duffel_order_payload(req.body.data);

            // 1. Checking payment status with intent before proceeding
            const paymentIntent = await stripe.paymentIntents.retrieve(
                pi?.id
            );
            if(!paymentIntent){
                res.status(500).send({message: "Failed at payment verification"});
                return;
            }
            if(paymentIntent?.status !== 'requires_capture'){
                res.status(500).send({message: "Failed at payment verification"});
                return;
            }

            // Checking order price against payment intent amount
            // 1.1 Getting Price Markup
            const price_markup_percentage = await get_price_markup_percentage();
            console.log("Price Markup:", price_markup_percentage);
            if(
                (markup(payload?.payments[0]?.amount, price_markup_percentage).new_price.toFixed(0)*100)
                !== paymentIntent?.amount
            ){
                res.status(500).send({message: `
                    The payment amount you've submitted for this booking is not adequate
                `
                    /*ONLY FOR TESTING: `Server expects payment of ${(paymentIntent?.amount/100)}, and you submited
                    ${(markup(payload?.payments[0]?.amount).new_price.toFixed(0))}`*/
                });
                return;
            }

            // 2.0 Remove Internal Fees
            if(fees)
                payload.payments[0].amount=(payload?.payments[0]?.amount-fees);
            // 2.1 Create order from Duffel
            flight_order = await require("../flight_providers/duffel").createOrder(payload);

            // 3. Capture payment with Stripe
            if(flight_order?.data?.id){

                const intent = await stripe.paymentIntents.capture(paymentIntent?.id);
                if(intent?.status==="succeeded"){
                    // Updating booking intent statuses and booking id, and also clearing any errors
                    setBookingIntentStatuses(bi._id, "confirmed", intent?.status, flight_order?.data?.id);
                    //Send email to admins for Booking and Payment Success
                    let _html = JSON.stringify(intent);
                    _html += `<br/><br/>${JSON.stringify(flight_order)}`;

                    const intent_sccs_msg = {
                        to: constants.email.admins_to,
                        from: constants.email.automated_from,
                        subject: "Welldugo - Payment Success & Booking Confirmed",
                        text: "Captured Payment And Booking Details Below:\n",
                        html: _html,
                    };
                    send_email(intent_sccs_msg);
                }else {
                    // Setting error message for Confirmed booking and payment
                    setBookingIntentStatuses(bi._id, "failed", paymentIntent?.status, "", true, {
                        message: "Flight Booking Failure: Not-In-Catch()"
                    });

                    //Send email to admins for confirmed booking and failed payment.
                    let _html2 = JSON.stringify(paymentIntent);
                    _html2 += `<br/><br/>${JSON.stringify(flight_order)}`;
                    const intent_fail_msg = {
                        to: constants.email.admins_to,
                        from: constants.email.automated_from,
                        subject: "Welldugo - Failed Payment But Confirmed Flight",
                        text: "New Flight Order Details Below:\n",
                        html: _html2,
                    };
                    send_email(intent_fail_msg);
                } 
            }else{
                // Setting error message for Booking Intent
                setBookingIntentStatuses(bi._id, "confirmed", paymentIntent?.status, flight_order?.data?.id, true, {
                    message: "Payment Capture Failure: Not-In-Catch()"
                });
            }

            // 4. Reply to client
            res.status(200).json(flight_order);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        // Setting error message for booking intent
        setBookingIntentStatuses(bi._id, "failed", pi?.status, "", true, {
            message: `In Catch() Block: ${(e?.errors && e?.errors[0]?.title) || "Server Error!"}`
        });
        res.status(500).send({message: (e?.errors && e?.errors[0]?.title) || "Server Error!"});
    }
}

/**
 * @desc Return booking prices markup percentage
 * @path GET /api/flights/price-markup-percentage/
 * @access private
 * @type controller
 */
const get_prices_markup_percentage = async (req, res, next) =>  {
    try{
        const price_markup_percentage = await get_price_markup_percentage();
        res.send(price_markup_percentage);
    }catch(e){
        console.log(e);
        res.status(500).send({message: (e?.errors && e?.errors[0]?.title) || "Server Error!"});
    }
}

module.exports = {
    get_flights,
    list_flight_offers,
    get_offer_info,
    get_offer_info_post_func,
    create_flight_order,
    get_prices_markup_percentage
}