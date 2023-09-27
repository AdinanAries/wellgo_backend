const { Duffel } = require('@duffel/api');

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

const createOfferRequest = async (search_obj) =>{
    return await duffel.offerRequests.create(search_obj);
}

const listOffers = async (offer_request_id_p, sort_p="total_amount", limit_p=1, max_connections_p=1, after_p="", before_p="") => {
    
    //after_p = "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB="; //for testing
    //before_p = "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB="; //for testing
    //offer_request_id_p="orq_00009htyDGjIfajdNBZRlw"; //for testing

    let api_send_obj={
        limit: limit_p,
        offer_request_id: offer_request_id_p,
        sort: sort_p,
        max_connections: max_connections_p
    }
    if(after_p) api_send_obj.after=after_p;
    if(before_p) api_send_obj.before=before_p;
    return await duffel.offers.list(api_send_obj);
}

module.exports = {
    createOfferRequest,
    listOffers
}