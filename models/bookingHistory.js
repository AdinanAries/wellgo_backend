const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const bookingHistorySchema = new Schema({
    oc_user_id: {
        type: String,
        required: false,
    },
    apiProvider: {
        type: String,
        required: true
    },
    providerBookingID: {
        type: String,
        required: true
    },
    originPayloads: {
        type: Array,
        required: true
    },
    type: { // flight, stays, rental car, etc.
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    anonymous_id: {
        type: String,
        required: false
    },
    airline: {
        type: String,
        required: false
    },
    ariline_code: {
        type: String,
        required: false
    },
    trip_type: {
        type: String,
        required: false
    },
    cabin_type: {
        type: String,
        required: false
    },
    travellers: {
        type: Array,
        required: false
    },
    takeoff_airport: {
        type: String,
        required: false
    },
    takeoff_airport_code: {
        type: String,
        required: false
    },
    takeoff_city: {
        type: String,
        required: false
    },
    destination_airport: {
        type: String,
        required: false
    },
    destination_airport_code: {
        type: String,
        required: false
    },
    destination_city: {
        type: String,
        required: false
    },
    departure_date: {
        type: String,
        required: false
    },
    return_date: {
        type: String,
        required: false
    },
    rental_car_company: {
        type: String,
        required: false
    },
    pickup_date: {
        type: String,
        required: false
    },
    drop_off_date: {
        type: String,
        required: false
    },
    pickup_time: {
        type: String,
        required: false
    },
    drop_off_time: {
        type: String,
        required: false
    },
    hotel_name: {
        type: String,
        required: false
    },
    checkin_date: {
        type: String,
        required: false
    },
    checkout_date: {
        type: String,
        required: false
    },
    checkin_time: {
        type: String,
        required: false
    },
    checkout_time: {
        type: String,
        required: false
    },
    prices: {
        type: Object,
        required: false
    },
    profits: { // type => [ flat-rate, percentage ] || amount => numeric value
        type: Object,
        required: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);