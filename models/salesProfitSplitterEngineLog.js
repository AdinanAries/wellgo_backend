const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesProfitSplitterEngineLogSchema = new Schema({
    oc_user_id: {
        type: String,
        required: false,
    },
    booking_record: {
        type: Object,
        required: [ true, "Please add booking record object" ],
    },
    order_record: {
        type: Object,
        required: false,
    },
    ticket_record:{
        type: Object,
        required: false,
    },
    data_provider: {
        type: String,
        required: [ true, "Please add data provider" ],
    },
    agent_profits: {
        type: Object,
        required: [ true, "Please add agent profits object" ],
    },
    booking_intent: {
        type: Object,
        required: [ true, "Please add booking intent object" ],
    },
    payment_intent: {
        type: Object,
        required: [ true, "Please add payment intent object" ],
    },
    customer_payment_method_details: {
        type: Object,
        required: false,
    },
    customer_charging_status: {
        type: String,
        required: [ true, "Please add customer charging status" ],
    },
    item_booking_status: {
        type: String,
        required: [ true, "Please add item booking status" ],
    },
    agent_profits_payment_status: {
        type: String,
        required: [ true, "Please add agent profits payment status" ],
    },
    product_type: {
        type: String,
        required: [ true, "Please add product type" ],
    },
    has_major_error: {
        type: Boolean,
        required: [ true, "Please add 'has_major_error' property" ],
        default: false,
    },
    any_errors: {
        type: Array,
        required: false,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('SalesProfitSplitterEngineLog', salesProfitSplitterEngineLogSchema);