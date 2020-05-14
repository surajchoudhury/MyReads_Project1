import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./components/SearchBook";
import ListBooks from "./components/ListBooks";
import { Route } from "react-router-dom";

class BooksApp extends Component {
  state = {
    books: null,

    //booksByShelfs

    currentlyReading: null,
    WantToRead: null,
    read: null,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books }, this.filterBooksByShelfs);
  };

  filterBooksByShelfs = () => {
    const { books } = this.state;
    const filter = (books) => (shelf) => books.filter((b) => b.shelf === shelf);
    const filterBy = filter(books);
    this.setState((currentState) => ({
      read: filterBy("read"),
      wantToRead: filterBy("wantToRead"),
      currentlyReading: filterBy("currentlyReading"),
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
        searched ? this.getAllBooks : this.filterBooksByShelfs
      )
    );
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    const listBooks = [
      { title: "Currently Reading", books: currentlyReading },
      { title: "Want To read", books: wantToRead },
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
          render={() => (
            <SearchBook
              onShelfChange={this.handleShelfChange}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
