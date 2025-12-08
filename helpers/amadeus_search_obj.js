/**
 * 
 * @param {object} obj 
 * @returns Amadeus Search Object for Flights API
 */
const get_amadeus_search_obj = (arg_obj) => {
    /* {
            type: 'round-trip',
            itinerary: {
                departure: { airport: 'JFK', date: '2023-10-26' },
                arrival: { airport: 'ACC', date: '2023-10-27' },
                cabin: 'ECONOMY',
                travelers: { adults: 1, children: 0, infants: 0 }
            }
    }
    */
    let _travelers = return_travelers_params(arg_obj.itinerary.travelers);
    let origin_destinations = return_origin_destinations_param(arg_obj);

    return {
        currencyCode: "USD",
        originDestinations: origin_destinations,
        travelers: _travelers,
        sources: ["GDS"],
        searchCriteria: {
            maxFlightOffers: 100,
            flightFilters: {
                cabinRestrictions: [
                    {
                        cabin: arg_obj.itinerary.cabin.toUpperCase(),
                        coverage: "MOST_SEGMENTS",
                        originDestinationIds: ["1"],
                    },
                ],
                /*carrierRestrictions: {
                    excludedCarrierCodes: ["AA", "TP", "AZ"],
                },*/
            },
        }
    };
}

const return_travelers_params = (passenger_param) => {

    let unique_id = 0;
    let adults = [];
    for (let i=0;i<passenger_param.adults;i++) {
        adults.push({
          id: (((++unique_id)+"")),
          travelerType: "ADULT",
          fareOptions: ["STANDARD"],
        });
    }

    let children = [];
    for (let j=0;j<passenger_param.children;j++) {
        children.push({
          id: (((++unique_id)+"")),
          travelerType: "CHILD",
          fareOptions: ["STANDARD"],
        });
    }

    let infants = [];
    for (let k=0;k<passenger_param.infants;k++) {
        infants.push({
          id: (((++unique_id)+"")),
          travelerType: "",
          fareOptions: ["STANDARD"],
        })
    }

    return [
        ...adults,
        ...children,
        //...infants
    ];

    /**
     * @desc Other passenger types
     *  {
            "fare_type": "student"
        }

        {
            "age": 5,
            "fare_type": "contract_bulk_child"
        }

     */
}

const return_origin_destinations_param = (itinerary) => {
    /**
     * @desc Parameter from parent function
     * type: 'round-trip',
            itinerary: {
                departure: { airport: 'JFK', date: '2023-10-26' },
                arrival: { airport: 'ACC', date: '2023-10-27' },
                cabin: 'ECONOMY',
                travelers: { adults: 1, children: 0, infants: 0 }
            }
     */
    let origin_destinations = [{
        id: "1",
        originLocationCode: itinerary.itinerary.departure.airport,
        destinationLocationCode: itinerary.itinerary.arrival.airport,
        departureDateTimeRange: {
            date: itinerary.itinerary.departure.date,
            //time: "10:00:00",
        },
    }];

    if(itinerary.type==='round-trip'){
        origin_destinations.push({
            id: "2",
            originLocationCode: itinerary.itinerary.arrival.airport,
            destinationLocationCode: itinerary.itinerary.departure.airport,
            departureDateTimeRange: {
                date: itinerary.itinerary.arrival.date,
                //time: "10:00:00",
            },
        })
    }

    return origin_destinations;
}

const return_amadeus_order_payload = (obj) => {
    return obj;
}

// Stays
/**
 * 
 * @param {object} obj 
 * @returns Duffel Search Object for Stays API
 */
const get_amadeus_stays_search_obj = (arg_obj) => {
    return {
        "rooms": 1,
        "location": {
            "radius": 5,
            "geographic_coordinates": {
                "longitude": -0.1416,
                "latitude": 51.5071
            }
        },
        "check_out_date": "2024-11-07",
        "check_in_date": "2024-11-04",
        "adults": 2
    };
}



module.exports = {
    get_amadeus_search_obj,
    get_amadeus_stays_search_obj,
    return_amadeus_order_payload,
}