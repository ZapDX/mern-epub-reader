// routes/books.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

function auth(req, res, next) {
    const h = req.headers.authorization;
    if(!h) return res.status(401).json({ error: 'Tidak ada token'})

    const token = h.split(" ")[1];
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }catch (err) {
        return res.status(401).json({error: "Invalid token"});
        }
}

// GET /api/books
router.get('/', auth, async (req, res)=> {
    try {
        const books = await Book.find({ owner: req.user.id})
        .select("title filename program_studi language createdAt");

        res.json({ books });
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'server error' });
        }
});

module.exports = router;