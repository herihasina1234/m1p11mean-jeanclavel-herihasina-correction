const mongoose = require('mongoose');
const User = require('./user');
const Service = require('./service');
const Schema = mongoose.Schema;

const customerPreferenceSchema = new mongoose.Schema({
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

    employee: {
        type: Schema.Types.ObjectId, // Utilisez ObjectId pour représenter une référence à un utilisateur
        ref: 'User', // Référence au modèle User
        required: [true, 'Please enter a employee'],
    }

});

const CustomerPreference = mongoose.model('customerPreference', customerPreferenceSchema);

module.exports = CustomerPreference;