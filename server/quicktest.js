// quicktest.js

const express =  require('express');
const path = require('path');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(4000, () => console.log('Ngetes Server Run di localhost:4000'));