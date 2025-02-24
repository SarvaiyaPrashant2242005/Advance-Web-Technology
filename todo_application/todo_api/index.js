const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
//middleware to convert in json
app.use(express.json());
//fetch the data
app.get("/", async (req, res) => {
  var f = req.query.filter;
  var data = readData();
  if (f) {
    data = data.filter((todo) =>
      f == "c" ? todo.isCompleted : f == "u" ? !todo.isCompleted : 1
    );
  }
  res.send(data);
});
//add todo
app.post("/", (req, res) => {
  const { title } = req.body;
  var data = readData();
  data = [...data, { id: Date.now(), title: title, isCompleted: false }];
  saveData(data);
  res.json(data);
});
//update based on id
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, isCompleted } = req.body;
  var data = readData();
  data = data.map((todo) =>
    todo.id == id ? { id, title, isCompleted } : todo
  );
  saveData(data);
  res.json(data);
});
//delete based on id
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  var data = readData();
  data = data.filter((todo) => todo.id != id);
  saveData(data);
  res.json(data);
});
//toggle all status
app.get("/toggle", (req, res) => {
  var data = readData();
  data = data.map((todo) => [...todo, (isCompleted = !todo.isCompleted)]);
  saveData(data);
  return data;
});
//fetch the data based on search
app.get("/:search", async (req, res) => {
  var st = req.params.search;
  var data = readData();
  data = data.filter((todo) => todo.title.includes(st));
  res.send(data);
});

//to read file
function readData() {
  var data = fs.readFileSync("data.json");
  if (data) return JSON.parse(data);
  else return [];
}
//to save dato in files
function saveData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}
app.listen(port, () =>
  console.log(`server started at http://localhost:${port}!`)
);
