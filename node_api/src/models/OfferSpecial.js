const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialOfferSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Please enter a service'],
    },

    startDate: {
        type: Date,
        required: [true, 'Please enter a date']
    },

    endDate: {
        type: Date,
        required: [true, 'Please enter a date']
    },

    discount: {
        type: Number,
        required: [true, 'Please enter the discount']
    },
});
const OfferSpecial = mongoose.model('OffreSpecial', specialOfferSchema);

module.exports = OfferSpecial;