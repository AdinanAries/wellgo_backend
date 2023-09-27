const constants = require("../constants");

// Import application helpers
const { return_flight_search_obj } = require("../helpers/construct_search_obj");

/**
 * @desc Get flight offer requests from data provider
 * @path POST /api/flights/
 * @access private
 */
const get_flights = async(req, res, next)=>{
    let offers;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offers = await require("../flight_providers/duffel").createOfferRequest(return_flight_search_obj());
            res.status(200).json(offers);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
}

/**
 * @desc Lists all flight offers for a selected offer request
 * @path POST /api/flights/list/offers/
 * @access private
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
        console.log(e.message);
        res.status(500).send(e.message);
    }
}

/**
 * @desc Get complete, up-to-date information about an offer
 * @path GET /api/flights/offers/:id
 * @access private
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
        res.status(500).send(e.message);
    }
}

module.exports = {
    get_flights,
    list_flight_offers,
    get_offer_info
}