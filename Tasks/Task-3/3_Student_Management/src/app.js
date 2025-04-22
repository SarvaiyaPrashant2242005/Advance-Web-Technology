const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentRoutes);

app.get('/', (req, res) => res.send('🎉 Student Management API is running!'));

module.exports = app;
