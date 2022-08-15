const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routers/autheRoutes');
//CONFIG EXPRESS
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//CONFIG ENV
require('dotenv').config();
// CONNECTION TO DB
mongoose.connect(process.env.URL_DB, { dbName: 'AuthDB' });
//ROUTE API AUTH
app.use('/api/auth/v1', authRoutes);
//LISTING SERVER
app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
