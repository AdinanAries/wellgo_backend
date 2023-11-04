const addLog = (req, res, next) => {
    res.status(200).send("Logged Booking");
}

const getLog = (req, res, next) => {
    res.status(200).send("Getting single Booking Log");
}

const getLogs = (req, res, next) => {
    res.status(200).send([
        {
            id: "001",
            apiProvider: "duffel",
            bookingID: "",
            originPayloads: [],
            type: "flight",
            user_id: "001",
            airline: "American Airlines",
            ariline_code: "",
            trip_type: "round trip",
            travellers: [{
                first_name: "MOhammed",
                last_name: "Adinan",
                gender: "male",
                dob: "03-23-1992",
            }],
            takeoff_airport: "Laguardia",
            takeoff_airport_code: "",
            takeoff_city: "New York",
            destination_airport: "Kotoka",
            destination_airport_code: "",
            destination_city: "Accra",
            departure_date: "03-23-2023",
            return_date: "04-09-2023"
        },
        {
            id: "001",
            apiProvider: "duffel",
            bookingID: "",
            originPayloads: [],
            type: "flight",
            user_id: "001",
            airline: "Virgin Airlines",
            ariline_code: "",
            trip_type: "round trip",
            travellers: [{
                first_name: "Mohammed",
                last_name: "Adinan",
                gender: "male",
                dob: "03-23-1992",
            }],
            takeoff_airport: "JFK",
            takeoff_airport_code: "",
            takeoff_city: "New York",
            destination_airport: "Charles de Gaulle Intl",
            destination_airport_code: "",
            destination_city: "Paris",
            departure_date: "01-20-2023",
            return_date: "02-11-2023"
        }
    ])
}

module.exports = {
    addLog,
    getLog,
    getLogs
}