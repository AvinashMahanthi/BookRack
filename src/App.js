import "./App.css";
import Books from "./Components/books";
import { useEffect, useState } from "react";
import { BooksData } from "./Components/booksData";
import Pagination from "./Components/Pagination";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [results, setResults] = useState("");

  useEffect(() => {
    setLoading(true);
    setBooks(BooksData);
    setLoading(false);
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchSecificBook = (term) => {
    if (term !== " ") {
      const newBooks = books.filter((item) => {
        // return item.author.toLowerCase().includes(term.toLowerCase());
        return Object.keys(item).some((keys) => {
          return item[keys]
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase());
        });
      });
      setBooks(newBooks);
      newBooks.length > 0
        ? setResults(newBooks.length)
        : setResults("Sorry, No results Found :(");
      // setResults(newBooks.length);
      console.log(newBooks.length);
    } else {
      setBooks(BooksData);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">BookRack</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="mt-2" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="mt-2" href="#features">
              Features
            </Nav.Link>
            <Form className="d-flex m-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search.."
                onInput={(e) => {
                  searchSecificBook(e.target.value);
                }}
              />
              <Button variant="outline-success ml-3">Search</Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
      <header className="App-header">
        {results ? (
          <div className="card-body">
            <h4>{results} Results found</h4>
          </div>
        ) : (
          <></>
        )}

        <div className="container">
          <div className="row">
            <Books books={currentBooks} loading={loading} />
          </div>
        </div>

        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={books.length}
          paginate={paginate}
        />
      </header>
    </div>
  );
}

export default App;
