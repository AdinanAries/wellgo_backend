const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratedPlacesSchema = new Schema({
    place: {
        type: Object
    },
    scores: {
        safety: {
            type: Object
        },
        subway: {
            type: Object
        },
        taxi: {
            type: Object
        },
        bus: {
            type: Object
        },
        cost: {
            type: Object
        },
        urbanization: {
            type: Object
        },
        reviews: {
            type: Array
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('RatedPlaces', ratedPlacesSchema);