import React from "react";
import bookimg from "../images/book.png";

const books = ({ books, loading }) => {
  //   if (loading) {
  //     return <h2>Loading...</h2>;
  //   }

  return (
    <ul className="list-group mb-4">
      {books.map((book) => (
        <>
          <div className="card grid-container">
            <div className="grid-child">
              <img src={bookimg} />
            </div>
            <div className="card-body grid-child">
              <h2>{book.title}</h2>
              <h5>
                {book.author} - {book.year}
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          </div>
        </>
      ))}
    </ul>
  );
};

export default books;
