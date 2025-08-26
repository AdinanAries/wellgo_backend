const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingIntentLogSchema = new Schema({
    oc_user_id: {
        type: String,
        required: false,
    },
    product_type: {
        type: String,
        required: false,
    },
    is_package_item: {
        type: Boolean,
        required: true,
        default: false,
    },
    package_id: {
        type: String,
        required: false,
    },
    is_booking_link_sale: {
        type: Boolean,
        required: true,
        default: false, 
    },
    booking_link_id: {
        type: String,
        required: false,
    },
    payment_status: {
        type: String
    },
    booking_status: {
        type: String
    },
    is_error: { 
        type: Boolean
    },
    error_activity_description: {
        type: String
    },
    payment_intent: {
        type: Object
    },
    booking_order: {
        type: Object
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

module.exports = mongoose.model('BookingIntentLog', bookingIntentLogSchema);