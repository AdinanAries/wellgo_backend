const { 
    default_pagination_page_limit, 
    duffel_sort_total_amount, 
    duffel_max_connections 
} = require("../constants");

const Amadeus = require('amadeus');
const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRETE = process.env.AMADEUS_API_SECRETE;

const amadeus = new Amadeus({
    clientId: API_KEY,
    clientSecret: API_SECRETE
});

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Offer ....
 * @type library
 */
const listOffers = async (search_obj) => {
    return await amadeus.shopping.flightOffersSearch.post(search_obj); 
}


/**
 * @desc Returns full details of flight offer
 * @param {Object} flightObject
 * @returns ...
 * @type library
 */
const getOffer = async (flightObject) => {
    return await amadeus.shopping.flightOffers.pricing.post({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flightObject],
        },
      },
      { 
        include: "credit-card-fees,detailed-fare-rules" 
    });
}

/**
 * @desc Creates Flight Order
 * @param {*} payload
 * @returns ....
 * @type library
 */
const createOrder = async (payload) => {
    return await amadeus.booking.flightOrders.post(payload);
}

module.exports = {
    listOffers,
    getOffer,
    createOrder
}