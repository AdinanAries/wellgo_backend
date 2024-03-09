/**
 * 
 * @param {object} obj 
 * @returns Duffel Search Object for Flights API
 */
const get_duffel_search_obj = (arg_obj) => {
    /**
     *  @desc Example object from frontend
     * {
            type: 'round-trip',
            itinerary: {
                departure: { airport: 'JFK', date: '2023-10-26' },
                arrival: { airport: 'ACC', date: '2023-10-27' },
                cabin: 'ECONOMY',
                travelers: { adults: 1, children: 0, infants: 0 }
            }
    * }
    */
    let priv_fares = return_private_fairs_params();
    let passengers = return_passengers_params(arg_obj.itinerary.travelers);
    let slices = return_slices_param(arg_obj);

    return {
        "return_offers": false,
        "supplier_timeout": 10000,
        "slices": slices,
        "private_fares": priv_fares,
        "passengers": passengers,
        "max_connections": 1,
        "cabin_class": arg_obj.itinerary.cabin.toLowerCase()
    };
}

const return_passengers_params = (passenger_param) => {

    let adults = [];
    for (let i=0;i<passenger_param.adults;i++) {
        adults.push({
            "family_name": "",
            "given_name": "",
            /*"loyalty_programme_accounts": [
                {
                    "account_number": "12901014",
                    "airline_iata_code": "BA"
                }
            ],*/
            "type": "adult"
        });
    }

    let children = [];
    for (let j=0;j<passenger_param.children;j++) {
        children.push({
            /*"age": 14*/
            "type": "child"
        });
    }

    let infants = [];
    for (let k=0;k<passenger_param.infants;k++) {
        infants.push({
            /*"age": 2*/
            "type": "infant_without_seat"
        })
    }

    return [
        ...adults,
        ...children,
        ...infants
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

const return_private_fairs_params = () => {
    return {
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
    };
}

const return_slices_param = (itinerary) => {
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
    let slices = [{
        "origin": itinerary.itinerary.departure.airport,
        "destination": itinerary.itinerary.arrival.airport,
        "departure_time": {
            "to": "23:59",
            "from": "00:00"
        },
        "departure_date": itinerary.itinerary.departure.date,
        "arrival_time": {
            "to": "23:59",
            "from": "00:01"
        }
    }];

    if(itinerary.type==='round-trip'){
        slices.push({
            "origin": itinerary.itinerary.arrival.airport,
            "destination": itinerary.itinerary.departure.airport,
            "departure_time": {
                "to": "23:59",
                "from": "00:00"
            },
            "departure_date": itinerary.itinerary.arrival.date,
            "arrival_time": {
                "to": "23:59",
                "from": "00:00"
            }
        })
    }

    return slices;
}

// Stays
/**
 * 
 * @param {object} obj 
 * @returns Duffel Search Object for Stays API
 */
const get_duffel_stays_search_obj = (arg_obj) => {
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
    get_duffel_search_obj,
    get_duffel_stays_search_obj,
}