const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointments',
        required: [true, 'Please enter an appointment'],
    },    
    amount: {
        type: Number,
        required: [true, 'Please enter an amount']
    },
    paymentDate: {
        type: Date,
        required: [true, 'Please enter a date of payment']
    }
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;