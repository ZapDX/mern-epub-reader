// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require(' path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const booksRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

// mount routes(pastikan file di routes/ ada)
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/books', booksRoutes);

const PORT = ProcessingInstruction.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(()=> {
        console.log('Terhubung ke MongoDB');
        app.listen(PORT, ()=> console.log(`Server berjalan di http://localhost:${PORT}`))
    })
    .catch(err => {
        console.error('Koneksi ke MongoDB error:', err);
        //exit so nodemon shows the error clearly
        process.exit(1);
    });
