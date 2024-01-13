const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const bookingHistorySchema = new Schema({
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
    type: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    anonymous_id: {
        type: String
    },
    airline: {
        type: String,
        required: true
    },
    ariline_code: {
        type: String,
        required: true
    },
    trip_type: {
        type: String,
        required: true
    },
    cabin_type: {
        type: String,
        required: true
    },
    travellers: {
        type: Array,
        required: true
    },
    takeoff_airport: {
        type: String,
        required: true
    },
    takeoff_airport_code: {
        type: String,
        required: true
    },
    takeoff_city: {
        type: String,
        required: true
    },
    destination_airport: {
        type: String,
        required: true
    },
    destination_airport_code: {
        type: String,
        required: true
    },
    destination_city: {
        type: String,
        required: true
    },
    departure_date: {
        type: String,
        required: true
    },
    return_date: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);