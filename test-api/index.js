const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/uni", (req, res) => res.send("Welcome to MU"));
app.get("/uni/faculty", (req, res) => res.send("Welcome to MU-FOT"));
app.get("/student", (req, res) =>
  res.json({
    name: "Anuj",
    city: "Rajkot",
    branch: "ICT",
  })
);
app.post("/", (req, res) => res.send("from post api call"));
app.get("/fullname/:fname/:lname", (req, res) => {
  res.send(req.params.fname + " " + req.params.lname);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
