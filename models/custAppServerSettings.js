const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const custAppServerSettingsSchema = new Schema({
    property: {
        type: String,
        required: [true, "Please add the settings property"],
        unique: true,
    },
    value: {
        type: String,
        required: [true, "Please add the value you're setting for this property"],
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('CustAppServerSettings', custAppServerSettingsSchema);