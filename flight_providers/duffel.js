const { 
    default_pagination_page_limit, 
    duffel_sort_total_amount, 
    duffel_max_connections 
} = require("../constants");

const { Duffel } = require('@duffel/api');

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Offer ....
 * @type library
 */
const createOfferRequest = async (search_obj) => {
    return await duffel.offerRequests.create(search_obj);
}

/**
 * @desc Lists Flight Offers
 * @param {Object} offer_request_id 
 * @returns Flights Offers List
 * @type library
 */
const listOffers = async (
        offer_request_id_p, 
        sort_p = duffel_sort_total_amount, 
        limit_p = default_pagination_page_limit, 
        max_connections_p = duffel_max_connections, 
        after_p="", 
        before_p=""
) => {
    let api_send_obj={
        limit: limit_p,
        offer_request_id: offer_request_id_p,
        sort: sort_p,
        max_connections: max_connections_p
    }
    if(after_p) api_send_obj.after = after_p;
    if(before_p) api_send_obj.before = before_p;
    return await duffel.offers.list(api_send_obj);
}

/**
 * @desc ...
 * @param {*} id 
 * @param {*} include_services 
 * @returns ...
 * @type library
 */
const getOffer = async (id, include_services=true) => {
    return await duffel.offers.get(
        id, {
            return_available_services: include_services
        }
    );
}

/**
 * @desc Creates Flight Order
 * @param {Object} payload
 * @returns Order Confirmation Defails
 * @type library
 */
const createOrder = async (payload) => {
    return await duffel.orders.create(payload)
}

module.exports = {
    createOfferRequest,
    listOffers,
    getOffer,
    createOrder
}