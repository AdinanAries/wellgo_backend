const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const paymentCardSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    card_number: {
        type: String,
        required: true
    },
    holder_name: {
        type: String,
        required: true
    },
    exp_date: {
        type: String,
        required: true
    },
    sec_code: {
        type: String,
        required: true
    },
    billing: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: true
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('PaymentCard', paymentCardSchema);