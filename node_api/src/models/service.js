const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    },
    duration: {
        type: Number,
        required: [true, 'Please enter a duration'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price']
    },
    commission: {
        type: Number,
        required: [true, 'Please enter a commission']
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;