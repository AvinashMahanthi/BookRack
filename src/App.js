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
import { NavDropdown } from "react-bootstrap";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // console.log(books);
    setLoading(true);
    setBooks(BooksData);
    setLoading(false);
  }, []);

  // const options = [
  //   { key: 1, value: "Author" },
  //   { key: 2, value: "Title" },
  //   { key: 3, value: "Year" },
  // ];

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchSecificBook = (term) => {
    if (term !== " ") {
      const newBooks = books.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key]
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase());
        });
        // return books.author.toLowerCase().includes(term.toLowerCase());
      });
      setBooks(newBooks);
      // console.log(newBooks);
    } else {
      setBooks(BooksData);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BookRack</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown title="Filter" id="basic-nav-dropdown">
              {/* {options.map((option) => {
                <NavDropdown.Item
                  selectedKey={selectedOption}
                  
                >
                  {option.value}
                </NavDropdown.Item>;
              })} */}
              <NavDropdown.Item
                onSelect={() => {
                  setSelectedOption("title");
                }}
              >
                Title
              </NavDropdown.Item>
              <NavDropdown.Item
                onSelect={() => {
                  setSelectedOption("author");
                }}
              >
                Author
              </NavDropdown.Item>
              <NavDropdown.Item
                onSelect={() => {
                  setSelectedOption("year");
                }}
              >
                Published Year
              </NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex ml-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onInput={(e) => {
                  searchSecificBook(e.target.value, selectedOption);
                }}
              />
              <Button variant="outline-success ml-3">Search</Button>
            </Form>
          </Nav>
        </Container>
      </Navbar>
      <header className="App-header">
        <Books books={currentBooks} loading={loading} />
        <div className="">
          <div className=""></div>
          <div className="">
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={books.length}
              paginate={paginate}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
