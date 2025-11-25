//models/User.js

const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: {type: String, default:""},
    email: {type: String, unique: true, required: true},
    passwordHash: { type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', Userschema);