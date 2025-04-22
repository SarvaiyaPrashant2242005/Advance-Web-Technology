const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Path = require("path");

const app = express();
const port = 3001;

// ✅ Enable CORS
app.use(cors());

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const validExts = [".png", ".jpg", ".jpeg"];
  const ext = Path.extname(file.originalname).toLowerCase();
  if (!validExts.includes(ext)) {
    return callback(new Error("Only .png, .jpg & .jpeg file formats are allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage: uploadStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1048576 },
});

app.post("/profile", upload.single("avatar"), function (req, res) {
  console.log(req.file);
  res.send("Success");
});

app.get("/", (req, res) => res.send("Hello World!"));

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
