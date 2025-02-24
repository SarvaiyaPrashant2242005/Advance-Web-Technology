//22,27,d13,d19,30,40,29,d7,18,94-1,26,34,d8,d9,d10,36,14,d12,d16 - 07-01-25 6tk1 present AWT
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Welcome to MU"));
app.get("/student", (req, res) =>
  res.json({ name: "Shamsaagazarzoo Alam", city: "Rajkot" })
);
app.get("/uni", (req, res) => res.send("MU"));
app.get("/uni/faculty", (req, res) => res.send("Faculty of Technology"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
