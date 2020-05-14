import React from "react";
import Book from "./Book";

const BookShelf = (props) => {
  const { bookLists, onShelfChange } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookLists ? (
            bookLists.length ? (
              props.bookLists.map((books) => (
                <li key={books.id}>
                  <Book
                    book={books}
                    onShelfChange={onShelfChange}
                    searched={false}
                  />
                </li>
              ))
            ) : (
              <div className="showing-contacts">
                <span>
                  No{" "}
                  <span
                    style={{ color: "#3D7C32", fontWeight: 800, fontSize: 25 }}
                  >
                    Books
                  </span>{" "}
                  In the shelf !
                </span>
              </div>
            )
          ) : (
            <div className="loader" />
          )}
        </ol>
      </div>
    </div>
  );
};



export default BookShelf;
