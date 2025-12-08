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
    data_provider: {
        type: String,
        required: [ true, "Please add data provider" ],
    },
    agent_profits: {
        type: Object,
        required: [ true, "Please add agent profits object" ],
    },
    customer_payment_method_details: {
        type: Object,
        required: [ true, "Please add customer payment method details object" ],
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
},
{
    timestamps: true
});

module.exports = mongoose.model('SalesProfitSplitterEngineLog', salesProfitSplitterEngineLogSchema);