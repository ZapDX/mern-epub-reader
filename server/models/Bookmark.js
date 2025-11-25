//models/Bookmark.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    cfi: String,        
    note: String,
    createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Bookmark', BookmarkSchema);