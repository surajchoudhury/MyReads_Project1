import React from "react";
import Bookshelf from "./BookShelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListBooks = (props) => {
  const { listBooks, onShelfChange } = props;
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          {listBooks.map(({ title, books }) => (
            <Bookshelf
              key={title}
              title={title}
              bookLists={books}
              onShelfChange={onShelfChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

ListBooks.prototype = {
  onSelfChange: PropTypes.func.isRequired,
};

export default ListBooks;
