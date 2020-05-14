import React, { Component, createRef } from "react";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import SearchTerms from "./SearchTerms";
import terms from "../assets/terms";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      error: false,
      focus: false,
    };
    this.input = createRef();
  }

  handleFocus = (focus) => {
    this.setState((currentState) => ({ focus }));
  };

  onSearch = async ({ target: { value } }) => {
    try {
      // if (!this.state.searchResults.length || !this.state.error) {
      this.handleFocus(true);
      // }

      const response =
        value.trim().length &&
        BooksAPI.search(value.trim().toLowerCase(), 20).then(
          (results) => results
        );
      const data = await response;
      const searchResults = data.map((book) => {
        const bookInShelf = this.props.books.find((b) => b.id === book.id);
        if (bookInShelf) {
          book.shelf = bookInShelf.shelf;
        }
        return book;
      });

      if (searchResults.length) {
        this.updateState(null, searchResults);
        this.handleFocus(false);
      } else if (!value.trim().length) {
        this.updateState(null, []);
        this.handleFocus(true);
      }
    } catch (error) {
      this.updateState(true, []);
      this.handleFocus(false);
    }
  };

  updateState = (error, searchResults) => {
    this.setState((currentState) => ({ error, searchResults }));
  };

  clearQuery = () => {
    this.updateState(null, []);
    this.input.current.value = "";
  };

  render() {
    const { searchResults, error, focus } = this.state;
    const { onShelfChange } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onKeyUp={this.onSearch}
                ref={this.input}
                onFocus={() => this.handleFocus(true)}
              />
            </Debounce>

            {focus && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  background: "#fff",
                  padding: "5px",
                }}
              >
                {terms.map((term) => (
                  <SearchTerms key={term} term={term} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="search-books-results">
          {searchResults.length ? (
            <div className="showing-contacts">
              <span>Now showing {searchResults.length} Results</span>
              <button onClick={this.clearQuery}>Clear All</button>
            </div>
          ) : (
            ""
          )}
          <ol className="books-grid">
            {searchResults.length
              ? searchResults.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      onShelfChange={onShelfChange}
                      searched={true}
                    />
                  </li>
                ))
              : ""}
            {
              <p>
                {error && (
                  <span>
                    No<span className="no_result">Results</span>Found
                  </span>
                )}
              </p>
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
