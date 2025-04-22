const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const patientRoutes = require('./routes/userRoutes');
const checkupRoutes = require('./routes/checkupRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api', checkupRoutes);
app.use('/api', prescriptionRoutes);
app.use('/api/payments', paymentRoutes);


sequelize.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("Database connection failed:", err));
