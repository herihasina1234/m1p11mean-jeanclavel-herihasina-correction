const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, 'Please enter a designation'],
    },
    code: {
        type: String,
        required: [true, 'Please enter a code'],
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;