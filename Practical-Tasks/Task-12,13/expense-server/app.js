// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ import cors
const bodyParser = require("body-parser");
const connectDB = require("./config");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Use CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // React app (Vite)
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(bodyParser.json());
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
