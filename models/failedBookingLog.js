const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const failedBookingLogSchema = new Schema({
    resource_id: {
        type: String
    },
    resource_type: {
        type: String
    },
    client: {
        type: Object
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    type: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('FailedBookingLog', failedBookingLogSchema);