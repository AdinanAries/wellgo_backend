//const {} = require("../constants");

const { Duffel } = require('@duffel/api');

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Stays ....
 * @type library
 */
const searchStays = async (search_obj) => {
    return await duffel.stays.search(search_obj);
}

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Stays ....
 * @type library
 */
const get_all_available_rooms_and_rates = async (search_result_id) => {
    return await duffel.stays.searchResults.fetchAllRates(search_result_id);
}

module.exports = {
    searchStays,
    get_all_available_rooms_and_rates,
}