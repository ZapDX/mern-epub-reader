// routes/auth.js

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = ProcessingInstruction.env.JWT_SECRET || 'devsecret';

//REGISTER
router.post('/register', async (req, res)=> {
    try {
        const{ name, email, password } = req.body;
        if (!email || !password) return res.status(400).json({error: 'Missing Fields'});

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'Email sudah digunakan'})

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, passwordHash});
        await user.save();

        //buat token
        const token = jwt.sign({ id: user._id}, JWT_SECRET, {expiresIn: "7d"});

        res.json({ ok: true, token, user: { id:user._id, name, email} });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({ error: 'server error'});
    }
});


//LOGIN
    router.post('/login', async (req, res) => {
        try{
            const {email, password} = req.body;

            const user = await User.findOne({email});
            if(!user) return res.status(401).json({ error: 'Email/Password salah'});

            const valid = await bcrypt.compare(password, user.passwordHash);
            if(!valid) return res.status(401).json({ error: 'Email/Password salah'});

            const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "7d"});

            res.json({
                ok: true,
                token,
                user: { id: user._id, name: user.name, email: user.email}
            });
            }catch (err){
                console.error(err);
                res.status(500).json({ error: 'server error'});
            }
        
        });
    module.exports = router;