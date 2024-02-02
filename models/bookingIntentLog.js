const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingIntentLogSchema = new Schema({
    payment_status: {
        type: String
    },
    booking_status: {
        type: String
    },
    payment_intent: {
        type: Object
    },
    booking_order: {
        type: Object
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('BookingIntentLog', bookingIntentLogSchema);