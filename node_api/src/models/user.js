const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    name: {
        type: String,
        length: [100, 'length max is 100 characters'],

    },
    firstname: {
        type: String,
        length: [100, 'length max is 100 characters'],
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
});

module.exports = mongoose.model('User', userSchema);