const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeServiceSchema = new mongoose.Schema({
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

const EmployeeService = mongoose.model('employeeService', employeeServiceSchema);

module.exports = EmployeeService;