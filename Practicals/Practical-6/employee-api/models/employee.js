const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: String,
    salary: Number,
    email: { type: String, unique: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
