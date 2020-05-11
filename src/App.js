import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./components/SearchBook";
import ListBooks from "./components/ListBooks";
import { Route } from "react-router-dom";

class BooksApp extends Component {
  constructor(props) {
    super(props);

    const bookShelfs = ["currentlyReading", "wantToRead", "read"];
    this.state = {
      showSearchPage: false,
      books: null,
      bookShelfs,

      //booksByShelfs

      currentlyReading: null,
      WantToRead: null,
      read: null,
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(
        (currentState) => ({ books }),
        () => this.filterBooksByShelfs()
      );
    });
  };

  filterBooksByShelfs = () => {
    const { books, bookShelfs } = this.state;
    this.setState((currentState) => ({
      currentlyReading: books.filter((book) => book.shelf === bookShelfs[0]),
      WantToRead: books.filter((book) => book.shelf === bookShelfs[1]),
      read: books.filter((book) => book.shelf === bookShelfs[2]),
    }));
  };

  handleShelfChange = (book, shelf, searched) => {
    BooksAPI.update(book, shelf).then(
      this.setState(
        {
          books: this.state.books.map((b) => {
            if (b.title === book.title) {
              b.shelf = shelf;
              return b;
            } else {
              return b;
            }
          }),
        },
        () => (searched ? this.getAllBooks() : this.filterBooksByShelfs())
      )
    );
  };

  render() {
    const { currentlyReading, WantToRead, read } = this.state;
    const listBooks = [
      { title: "Currently Reading", books: currentlyReading },
      { title: "Want To read", books: WantToRead },
      { title: "Read", books: read },
    ];

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div>
                <ListBooks
                  listBooks={listBooks}
                  onShelfChange={this.handleShelfChange}
                />
              </div>
            </>
          )}
        />

        <Route
          path="/search"
          render={() => <SearchBook onShelfChange={this.handleShelfChange} />}
        />
      </div>
    );
  }
}

export default BooksApp;
