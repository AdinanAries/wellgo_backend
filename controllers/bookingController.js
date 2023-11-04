const BookingHistory = require("../models/bookingHistory");

const addLog = (req, res, next) => {
    const {
        apiProvider,
        providerBookingID,
        originPayloads,
        type,
        user_id,
        airline,
        ariline_code,
        trip_type,
        travellers,
        takeoff_airport,
        takeoff_airport_code,
        takeoff_city,
        destination_airport,
        destination_airport_code,
        destination_city,
        departure_date,
        return_date 
    } = req.body;
    const booking = new BookingHistory({
        apiProvider: apiProvider,
        providerBookingID: providerBookingID,
        originPayloads: originPayloads,
        type: type,
        user_id: user_id,
        airline: airline,
        ariline_code: ariline_code,
        trip_type: trip_type,
        travellers: travellers,
        takeoff_airport: takeoff_airport,
        takeoff_airport_code: takeoff_airport_code,
        takeoff_city: takeoff_city,
        destination_airport: destination_airport,
        destination_airport_code: destination_airport_code,
        destination_city: destination_city,
        departure_date: departure_date,
        return_date: return_date
    });
    booking.save().then((result) => {
        console.log("-----------------BOOKING HISTORY----------------");
        console.log(result);
        console.log("-----------------BOOKING HISTORY----------------");
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("BOOKING HISTORY ERROR!");
    });
}

const getLog = (req, res, next) => {
    console.log(req.params.id);
    const id=req.params.id;
    BookingHistory.findOne({_id: id})
    .then((booking) => {
        res.status(200).send(booking);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
}

const getLogs = (req, res, next) => {
    const user_id=req.params.user_id;
    BookingHistory.find({user_id: user_id})
    .then((bookings) => {
        res.status(200).send(bookings);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
    /*res.status(200).send([
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
    ])*/
}

module.exports = {
    addLog,
    getLog,
    getLogs
}