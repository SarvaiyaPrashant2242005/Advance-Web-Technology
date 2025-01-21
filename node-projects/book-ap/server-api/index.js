const express = require("express");
const app = express();
const port = 3000;
var books = [
    {
        id:1,
        title:'Unknown',
        author:'Unknown',
        price:500,
        pub_name:'Unknown',
        pub_year:2025,
    },
];

//to convert in to json format the request
app.use(express.json());
//To fetch all books
app.get("/", (req, res) => res.json(books));

//To add new book
app.post("/", (req, res) => {
  const{id, title, author, price, pub_name, pub_year}=req.body;
  books = [...books, {id, title, author, price, pub_name, pub_year}];
  res.json(books);
});

//To update book based on id
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const{title, author, price, pub_name, pub_year}=req.body;
  books = books.map((book)=>book.id == id?{id, title, author, price, pub_name, pub_year}:book)
  res.json(books);
});

//To delete a book based on id
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const{title, author, price, pub_name, pub_year}=req.body;
  books = books.filter((book) => book.id != id);
  res.json(books);
});

//To get book by id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  var newBook = books.filter((book) => book.id == id);
  res.json(newBook);
});

app.listen(port, () =>
  console.log(` server started on http://localhost:${port}!`)
);