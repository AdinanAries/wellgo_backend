const constants = require("../constants");
const { get_duffel_search_obj } = require("./duffel_search_obj");

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
  return obj;
}

const return_duffel_order_payload_object_example = () => {
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
    return_duffel_order_payload,
    return_duffel_order_payload_object_example
}