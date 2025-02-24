//22,27,d13,d19,30,40,29,d7,18,94-1,26,d8,d9,d10,36,14,d12,d16,11,d14 - 07-01-25 6tk1 present AWT

var students = [
  {
    id: 1,
    name: "Jay",
    city: "Rajkot",
    age: 14,
  },
  {
    id: 2,
    name: "Jay",
    city: "Rajkot",
    age: 14,
  },
  {
    id: 3,
    name: "Vijay",
    city: "Morbi",
    age: 10,
  },
  {
    id: 4,
    name: "Ajay",
    city: "Rajkot",
    age: 12,
  },
  {
    id: 5,
    name: "Raj",
    city: "Jamnagar",
    age: 12,
  },
];
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.json(students));
app.get("/student/:id", (req, res) => {
  var stud_id = req.params.id;
  var student = students.filter((s) => s.id == stud_id);
  res.json(student);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
