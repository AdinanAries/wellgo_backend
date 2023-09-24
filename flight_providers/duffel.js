const { Duffel } = require('@duffel/api');

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

const createOfferRequest = async (search_obj) =>{
    return await duffel.offerRequests.create(search_obj);
} 

module.exports = {
    createOfferRequest
}