// // routes/books.js

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Book = require('../models/Book');

// const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

// function auth(req, res, next) {
//     const h = req.headers.authorization;
//     if(!h) return res.status(401).json({ error: 'Tidak ada token'})

//     const token = h.split(" ")[1];
//     try {
//         const user = jwt.verify(token, JWT_SECRET);
//         req.user = user;
//         next();
//     }catch (err) {
//         return res.status(401).json({error: "Invalid token"});
//         }
// }

// // GET /api/books
// router.get('/', auth, async (req, res)=> {
//     try {
//         const books = await Book.find({ owner: req.user.id})
//         .select("title filename program_studi language createdAt");

//         res.json({ books });
//         }catch (err) {
//             console.error(err);
//             res.status(500).json({ error: 'server error' });
//         }
// });

// module.exports = router;



// routes/books.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// simple inline auth middleware (keamanan: cek token JWT)
function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'Tidak ada token' });

  const token = h.split(' ')[1];
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /api/books  -> daftar buku milik user
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id })
      .select('title filename program_studi language createdAt mimetype')
      .sort({ createdAt: -1 });

    res.json({ ok: true, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/books/:id -> detail buku (owner only)
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Not found' });
    if (String(book.owner) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ ok: true, book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// DELETE /api/books/:id -> hapus record + file fisik
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Not found' });
    if (String(book.owner) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // book.filename biasanya menyimpan path seperti '/uploads/<userId>/file.pdf'
    const absPath = path.join(__dirname, '..', book.filename);

    // Hapus file jika ada
    if (fs.existsSync(absPath)) {
      try {
        fs.unlinkSync(absPath);
      } catch (fsErr) {
        console.error('Failed to delete file:', fsErr);
        // proceed to remove DB record even if file deletion fails
      }
    }

    await Book.deleteOne({ _id: book._id });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
