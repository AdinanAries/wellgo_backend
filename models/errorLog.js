const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const errorLogSchema = new Schema({
    oc_user_id: {
        type: String,
        required: false,
    },
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

module.exports = mongoose.model('ErrorLog', errorLogSchema);