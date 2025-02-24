// 26,d7,18,3,d13,d19,11,1,40,d16,29,d9,d1,d14,d10,22,27,2,30,94-1,d8
const express = require("express");
const app = express();
const port = 3000;
var books = [
  {
    id: 1,
    title: "Unknown",
    author: "Me Only",
    price: 500,
    pub_name: "Pata nahi",
    pub_year: 2025,
  },
];
//to convert in to json format the request
app.use(express.json());
// to fetch all books
app.get("/", (req, res) => res.json(books));
//to add new book
app.post("/", (req, res) => {
  const { id, title, author, price, pub_name, pub_year } = req.body;
  books = [...books, { id, title, author, price, pub_name, pub_year }];
  res.json(books);
});
//to update a book based on id
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, author, price, pub_name, pub_year } = req.body;
  books = books.map((book) =>
    book.id == id ? { id, title, author, price, pub_name, pub_year } : book
  );

  res.json(books);
});
//to delete a book based on id
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  books = books.filter((book) => book.id != id);

  res.json(books);
});
//to fetch a book based on id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  var newBook = books.filter((book) => book.id == id);

  res.json(newBook);
});
app.listen(port, () =>
  console.log(` server started on http://localhost:${port} !`)
);
