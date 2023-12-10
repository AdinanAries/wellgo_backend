const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceAlertSubscriberSchema = new Schema({
    client: {
        type: Object
    },
    email: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('PriceAlertSubscriber', priceAlertSubscriberSchema);