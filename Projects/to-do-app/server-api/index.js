const { assert } = require("console");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
//middleware to convert in json
app.use(express.json());

// Create endpoint which will only toggle the completed status of all todos
app.get("/toggle", async (req,res) => {
  var data = readData();  
  data = data.map((todo) => [...todo, isCompleted = !todo.isCompleted])
  saveData(data);
  return data;

})

//fetch the data
app.get("/", async (req, res) => {
  var f = req.query.filter;

  var data = readData();
  if (f) {
    data = data.filter((todo) => f == "c" ? todo.isCompleted : f == "u" ? !todo.isCompleted : 1);
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


//DELETE BASED ON ID
app.delete("/:id", (req, res) => {
  const id = Number(req.params.id); // Convert ID to number
  let data = readData();
  const todoExists = data.some(todo => todo.id === id);
  if (!todoExists) {
    return res.status(404).json({ error: "Todo not found" });
  }
  data = data.filter(todo => todo.id !== id);
  saveData(data);
  res.json({ message: "Todo deleted successfully", data });
});


// SEARCH BASED ON TITLE
app.get('/:search', async (req, res) => {
  var st = req.params.search;
  var data = readData();
  data = data.filter((todo) => todo.title.includes(st));
  res.send(data);
})


//to read file
function readData() {
  var data = fs.readFileSync("data.json");
  if (data) return JSON.parse(data);
  else return [];
}



//to save dato in file
function saveData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
