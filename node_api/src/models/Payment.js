const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a customer'],
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Please enter a service'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter an amount']
    },
    datePayment: {
        type: Date,
        required: [true, 'Please enter a date of payment']
    }
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;