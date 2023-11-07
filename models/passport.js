const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passportSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    passport_number: {
        type: String,
        required: true
    },
    issue_date: {
        type: String,
        required: true
    },
    exp_date: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    holder_name: {
        type: String,
        required: true
    },
    holder_gender: {
        type: String,
        required: true
    },
    holder_nationality: {
        type: String,
        required: true
    },
    holder_dob: {
        type: String,
        required: true
    },
    holder_birth_city: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Passport', passportSchema);