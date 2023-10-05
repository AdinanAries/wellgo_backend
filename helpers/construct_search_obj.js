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
        "max_connections": 1,
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

/**
 * @param {} 
 * @returns
 */
const return_duffel_order_payload = (obj) => {
    return {
        "type": "instant",
        "services": [
          {
            "quantity": 1,
            "id": "ase_00009hj8USM7Ncg31cB123"
          }
        ],
        "selected_offers": [
          "off_00009htyDGjIfajdNBZRlw"
        ],
        "payments": [
          {
            "type": "balance",
            "currency": "GBP",
            "amount": "30.20"
          }
        ],
        "passengers": [
          {
            "title": "mrs",
            "phone_number": "+442080160509",
            "infant_passenger_id": "pas_00009hj8USM8Ncg32aTGHL",
            "identity_documents": [
              {
                "unique_identifier": "19KL56147",
                "type": "passport",
                "issuing_country_code": "GB",
                "expires_on": "2025-04-25"
              }
            ],
            "id": "pas_00009hj8USM7Ncg31cBCLL",
            "given_name": "Amelia",
            "gender": "f",
            "family_name": "Earhart",
            "email": "amelia@duffel.com",
            "born_on": "1987-07-24"
          }
        ],
        "metadata": {
          "payment_intent_id": "pit_00009htYpSCXrwaB9DnUm2"
        }
    }
}

module.exports = {
    return_flight_search_obj,
    return_duffel_order_payload
}