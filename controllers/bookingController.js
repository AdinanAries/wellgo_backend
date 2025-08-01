const BookingHistory = require("../models/bookingHistory");
const { make_post_request } = require("../fetch_request/fetch_request");
const { getOcApiHost }  = require("../environment");

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
        cabin_type,
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

    // Travel Agent Related
    let _activity=req?.body?.activity;

    const oc_user_id = (req?.body?.oc_user_id || "welldugo-non-agent-booking");

    const booking = new BookingHistory({
        oc_user_id,
        anonymous_id: anonymous_id,
        apiProvider: apiProvider,
        providerBookingID: providerBookingID,
        originPayloads: originPayloads,
        type: type,
        user_id: req.user.id,
        airline: airline,
        ariline_code: ariline_code,
        trip_type: trip_type,
        cabin_type: cabin_type,
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
    booking.save().then(async (result) => {
        // Add Agent Activity
        if(_activity?.oc_user_id){
            _activity.booking_log_id=result?._id;
            let path = (_activity?.booking_link_id
                ? "\\api\\wallets\\agent\\transaction\\booked-link\\create\\"
                : "\\api\\wallets\\agent\\transaction\\create\\"
             )
            let url = (getOcApiHost()+path);
            let _activity_res = await make_post_request(
                url,
                _activity,
            );
            console.log(_activity_res);
        }
        //console.log(result);
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
        cabin_type,
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

    // Travel Agent Related
    let _activity=req?.body?.activity;

    const oc_user_id = (req?.body?.oc_user_id || "welldugo-non-agent-booking");

    const booking = new BookingHistory({
        oc_user_id,
        anonymous_id: anonymous_id,
        apiProvider: apiProvider,
        providerBookingID: providerBookingID,
        originPayloads: originPayloads,
        type: type,
        airline: airline,
        ariline_code: ariline_code,
        trip_type: trip_type,
        cabin_type: cabin_type,
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
    booking.save().then(async (result) => {
        // Add Agent Activity
        //console.log(_activity);
        if(_activity){
            _activity.booking_log_id=result?._id;
            let path = (_activity?.booking_link_id
                ? "\\api\\wallets\\agent\\transaction\\booked-link\\create\\"
                : "\\api\\wallets\\agent\\transaction\\create\\"
            )
            let url = (getOcApiHost()+path);
            let _activity_res = await make_post_request(
                url,
                _activity
            );
            console.log(_activity_res);
        }
        //console.log(result);
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

const getLogByIdAndCustomerEmail = (req, res, next) => {
    const id=req.params.id;
    const email=req.params.email;
    console.log("id", id);
    console.log("email", email);
    BookingHistory.findOne({_id: id})
    .then((booking) => {
        let email_found=false;
        if(booking)
        for(let i=0; i<booking?.originPayloads[0].passengers?.length; i++){
            if(email===booking?.originPayloads[0].passengers[i].email){
                email_found=true;
            }
        }
       console.log(booking)
        if(email_found){
            res.status(200).send(booking);
            return;
        }else{
            res.status(200).send({});
        }
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
    const q = req.query;
    const PAGE = q.p; // Pagination current page
    const PAGE_SIZE = q.l; // Pagination page size
    const DEPARTURE_DATE = q.departure_date; // [ '2024-01-23' ]
    const TRIP_TYPE = q.trip_type; // ['', '*', 'ROUND-TRIP', 'ONE-WAY']
    const CABIN_TYPE = q.cabin_type; // [ '', '*', 'economy', 'premium', 'business', 'first_class' ]
    const RETURN_DATE = q.return_date; // [ '2024-01-26' ]

    const user_id=req.user.id;

    const FIND_OBJ = {
        user_id: user_id
    };

    if(TRIP_TYPE && (TRIP_TYPE !== "*")){
        FIND_OBJ.trip_type=TRIP_TYPE.toLowerCase();
    }
    if(CABIN_TYPE && (CABIN_TYPE !== "*")){
        FIND_OBJ.cabin_type = CABIN_TYPE;
    }
    if(DEPARTURE_DATE){
        FIND_OBJ.departure_date={$regex: DEPARTURE_DATE};
    }
    if(RETURN_DATE && (TRIP_TYPE.toLowerCase() === "round-trip")){
        FIND_OBJ.return_date={$regex: RETURN_DATE};
    }
    console.log("find object", FIND_OBJ);
    BookingHistory.find(FIND_OBJ)
	  .sort({ timestamp: -1 })
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
        let booking = await BookingHistory.findOne({_id: booking_id});
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
    getLogByIdAndCustomerEmail,
    getLogAnonymous,
    getLogs,
    setLogUserID
}
