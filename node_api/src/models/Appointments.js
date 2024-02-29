const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter a customer'],
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: [true, 'Please enter a service'],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
    status: String
});

const Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;