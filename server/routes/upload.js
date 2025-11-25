// routes/upload.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Middleware auth sederhana (JWT)
function auth(req, res, next) {
    const header = req.header.authorization;
    if (!header) return re.status(401).json({ error: 'No token'});

    const token = header.split(" ")[1];
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data; // {id: ... }
        next();
        }catch (err){
            return res.status(401).json({ error: "Invalid Token"});
        }
}

//Multer: simpan file ke uploads/<userId>/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'uploads', String(req.user.id));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const safe = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
        cb (null, safe);
    }
});
const upload = multer ({ storage });

//POST /api/upload
router.post('/', auth, upload.single('epub'), async (req, res) => {
    try {
        if(!req.file) return res.status(400).json({ error: "Tidak ada file yang diupload"});

        const { title, program_studi, language } = req.body;

        const filePath = `/uploads/${req.user.id}/${req.file.filename}`;

        const book = new Book({
            owner: req.user.id,
            title: title || req.file.originalname,
            filename: filePath,
            program_studi: program_studi || '',
            language: language || 'id'
        });

        await book.save();

        res.json({ ok: true, book});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'server error '});
    }
});

module.exports = router;