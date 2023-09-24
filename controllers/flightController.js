const constants = require("../constants");

// Import application helpers
const { return_flight_search_obj } = require("../helpers/construct_search_obj");

/**
 * @desc Get flight offers from data provider
 * @path POST /api/flights/
 * @access private
 */
const get_flights = async(req, res, next)=>{
    let offers;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offers = await require("../flight_providers/duffel").createOfferRequest(return_flight_search_obj());
        }else{
            //Error message here
        }
        console.log(offers);
        res.send('success');
    }catch(e){
        console.log(e);
        res.send("fail");
    }
}

module.exports = {
    get_flights
}