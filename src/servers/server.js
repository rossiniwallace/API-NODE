const express = require('express');
const app = express();

const auth = require('../routes/authRoutes');
const upload = require('../routes/uploadRoutes');

app.use(express.json());

app.use('/auth',auth);
app.use('/upload',upload);

module.exports = app;