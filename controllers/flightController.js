const constants = require("../constants");

// Import application helpers
const { return_flight_search_obj, return_duffel_order_payload  } = require("../helpers/construct_search_obj");

/**
 * @desc Get list of flights from data provider
 * @path POST /api/flights/
 * @access private
 * @type controller
 */
const get_flights = async(req, res, next)=>{
    //console.log(req.body);
    console.log(return_flight_search_obj(req.body));
    console.log("Currency:", req.body.currency);
    let offer_list;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            let offer_request = await require("../flight_providers/duffel").createOfferRequest(return_flight_search_obj(req.body));
            offer_list = await require("../flight_providers/duffel").listOffers(offer_request.data.id);
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
    let flight_order;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            let payload = return_duffel_order_payload(req.body.data);
            flight_order = await require("../flight_providers/duffel").createOrder(payload);
            res.status(200).json(flight_order);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send({message: (e?.errors && e?.errors[0]?.title) || "Server Error!"});
    }
}

module.exports = {
    get_flights,
    list_flight_offers,
    get_offer_info,
    create_flight_order
}