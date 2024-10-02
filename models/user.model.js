const mongoose = require('mongoose');
const vaildator = require('validator');
const userRoles = require('../utils/userRoles')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [vaildator.isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [userRoles.user, userRoles.admin, userRoles.manger],
        default: userRoles.user
    },
    avatar: {
        type: String,
        default: '../uploads/profile.png'
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)