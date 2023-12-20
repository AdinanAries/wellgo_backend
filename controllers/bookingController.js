const BookingHistory = require("../models/bookingHistory");

const addLog = (req, res, next) => {
    const {
        anonymous_id,
        apiProvider,
        providerBookingID,
        originPayloads,
        type,
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
        anonymous_id: anonymous_id,
        apiProvider: apiProvider,
        providerBookingID: providerBookingID,
        originPayloads: originPayloads,
        type: type,
        user_id: req.user.id,
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
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: err.message});
    });
}

const addLogAnonymous = (req, res, next) => {
    const {
        anonymous_id,
        apiProvider,
        providerBookingID,
        originPayloads,
        type,
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
        anonymous_id: anonymous_id,
        apiProvider: apiProvider,
        providerBookingID: providerBookingID,
        originPayloads: originPayloads,
        type: type,
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
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({message: err.message});
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

const getLogAnonymous = (req, res, next) => {
    console.log(req.params);
    const REF_NUMBER=req.params.ref;
    const EMAIL=req.params.email;
    BookingHistory.findOne({})
    .then((booking) => {
        res.status(200).send(booking);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error");
    }); 
}

const getLogs = (req, res, next) => {
    console.log(req.query);
    const user_id=req.user.id;
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

const setLogUserID = async (req, res, next) => {
    try{
        const booking_id=req.params.booking_log_id;
        const user_id=req.user.id;
        let booking = await BookingHistory.find({_id: booking_id});
        if(booking){
            booking.user_id=user_id;
            let updated = new BookingHistory(booking);
            let saved = await updated.save();
            res.status(201).send(saved);
        }else{
            res.status(500).send({message: "booking not found"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }; 
}

module.exports = {
    addLog,
    addLogAnonymous,
    getLog,
    getLogAnonymous,
    getLogs,
    setLogUserID
}