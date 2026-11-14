const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample book collection
let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988
  },
  {
    id: 2,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    year: 1999
  }
];

// Home route
app.get('/', (req, res) => {
  res.send("Welcome to Book Management API!");
});

// READ - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// READ - Get one book
app.get('/books/:id', (req, res) => {
  const book = books.find(
    b => b.id === Number(req.params.id)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);
});

// CREATE - Add a new book
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({
      message: "Please provide title, author and year"
    });
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    year
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// UPDATE - Update a book
app.put('/books/:id', (req, res) => {
  const book = books.find(
    b => b.id === Number(req.params.id)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({
      message: "Please provide all book details"
    });
  }

  book.title = title;
  book.author = author;
  book.year = year;

  res.json({
    message: "Book updated successfully",
    book
  });
});

// DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);

  const bookExists = books.some(b => b.id === id);

  if (!bookExists) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books = books.filter(b => b.id !== id);

  res.json({
    message: "Book deleted successfully"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
