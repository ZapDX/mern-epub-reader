//models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    filename: String,
    program_studi: String,
    language: {type: String, default: 'id'},
    createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Book', BookSchema);