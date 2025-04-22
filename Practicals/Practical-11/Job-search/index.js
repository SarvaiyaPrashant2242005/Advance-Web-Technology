const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
const jobRoutes = require("./routes/job.routes");
app.use("/api", jobRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Job Search API 🚀");
});

// Connect to DB and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
