const constants = require("../constants");

/**
 * 
 * @param {object} obj 
 * @returns Duffel Search Object for Flights API
 */
const get_duffel_search_obj = (obj) => {
    return {
        "return_offers": false,
        "supplier_timeout": 10000,
        "slices": [
            {
                "origin": "LHR",
                "destination": "JFK",
                "departure_time": {
                    "to": "17:00",
                    "from": "09:45"
                },
                "departure_date": "2023-12-24",
                "arrival_time": {
                    "to": "17:00",
                    "from": "09:45"
                }
            }
        ],
        "private_fares": {
            "QF": [
                {
                    "corporate_code": "FLX53",
                    "tracking_reference": "ABN:2345678"
                }
            ],
            "UA": [
                {
                    "corporate_code": "1234",
                    "tour_code": "578DFL"
                }
            ]
        },
        "passengers": [
            {
                "family_name": "Earhart",
                "given_name": "Amelia",
                "loyalty_programme_accounts": [
                    {
                    "account_number": "12901014",
                    "airline_iata_code": "BA"
                    }
                ],
                "type": "adult"
            },
            {
                "age": 14
            },
            {
                "fare_type": "student"
            },
            {
                "age": 5,
                "fare_type": "contract_bulk_child"
            }
        ],
        "max_connections": 0,
        "cabin_class": "economy"
    };
}

/**
 * 
 * @param {Object} req_body 
 * @returns Flight Search Object based on API Provider Specification
 */
const return_flight_search_obj = (req_body) => {
    if(process.env.DATA_PROVIDER === constants.duffel){
        return get_duffel_search_obj(req_body);
    }else{
        throw new Error("No data provider has been set");
    }
}

module.exports = {
    return_flight_search_obj
}