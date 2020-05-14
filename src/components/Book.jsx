import React from "react";

const Book = (props) => {
  const { book, onShelfChange, searched } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${
              book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : ""
            }")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : "none"}
            onChange={({ target: { value } }) =>
              onShelfChange(book, value, searched)
            }
          >
            <option value="disabled" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default React.memo(Book);
