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

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Stays ....
 * @type library
*/
const create_final_quote = async (rate_id) => {
    return await duffel.stays.quotes.create(rate_id);
}

/**
 * @desc ...
 * @param {Object} search_obj 
 * @returns Stays ....
 * @type library
*/
const create_booking = async (req_obj) => {
    return await duffel.stays.bookings.create({
        stay_special_requests: "2:00 PM early check-in required",
        quote_id: QUOTE_ID,
        phone_number: "+442080160509",
        guests: [
          {
            given_name: "Amelia",
            family_name: "Earhart",
            born_on: "1987-07-24"
          }
        ],
        email: "amelia.earhart@duffel.com",
        accommodation_special_requests: "2:00 PM early check-in required"
    })
}

module.exports = {
    searchStays,
    get_all_available_rooms_and_rates,
    create_final_quote,
    create_booking,
}