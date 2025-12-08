const constants = require("../constants");
const { 
  get_duffel_search_obj, 
  get_duffel_stays_search_obj,
  return_duffel_order_payload,
} = require("./duffel_search_obj");

const {
  get_amadeus_search_obj,
  return_amadeus_order_payload,
} = require("./amadeus_search_obj");
const { 
  get_sabre_search_obj 
} = require("./sabre_search_obj");

/**
 * 
 * @param {Object} req_body 
 * @returns Flight Search Object based on API Provider Specification
 */
const return_flight_search_obj = (req_body, data_provider) => {

    if(data_provider?.toUpperCase() === constants.duffel){
      return get_duffel_search_obj(req_body);
    }else if(data_provider?.toUpperCase() === constants.amadeus){
      return get_amadeus_search_obj(req_body);
    }else if(data_provider?.toUpperCase() === constants.sabre){
      return get_sabre_search_obj(req_body);
    }else{
      throw new Error("No data provider has been set");
    }
}

/**
 * 
 * @param {Object} req_body 
 * @returns Flight Search Object based on API Provider Specification
 */
const return_hotel_search_obj = (req_body, data_provider=constants.duffel) => {
  if(/*process.env.DATA_PROVIDER*/data_provider?.toUpperCase() === constants.duffel){
      return get_duffel_stays_search_obj(req_body);
  }else{
      throw new Error("No data provider has been set");
  }
}

/**
 * @param {} 
 * @returns
 */
const return_order_payload = (obj, data_provider=constants.duffel) => {
  let common = {};
  if(data_provider?.toUpperCase() === constants.duffel){
      common = return_duffel_order_payload(obj);
  }else if(data_provider?.toUpperCase() === constants.amadeus){
      return return_amadeus_order_payload(obj);
    }else{
      throw new Error("No data provider has been set");
  }
  return common;
}



module.exports = {
    // Flights
    return_flight_search_obj,
    return_order_payload,
    // Stays
    return_hotel_search_obj,
}