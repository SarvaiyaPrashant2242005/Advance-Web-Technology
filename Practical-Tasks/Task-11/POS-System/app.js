const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const billRoutes = require('./routes/billRoutes');

const app = express();
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/bill', billRoutes);

module.exports = app;
