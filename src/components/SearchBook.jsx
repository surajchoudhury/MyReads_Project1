import React, { Component, createRef } from "react";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import SearchTerms from "./SearchTerms";
import { Link } from "react-router-dom";

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      error: null,
      focus: false,
    };
    this.input = createRef();
  }

  handleFocus = (focus) => {
    this.setState((currentState) => ({ focus }));
  };

  onSearch = async ({ target: { value } }) => {
    if (!this.state.searchResults.length || !this.state.error) {
      this.handleFocus(true);
    }

    const response =
      value.trim().length &&
      BooksAPI.search(value.trim().toLowerCase(), 20).then(
        (results) => results
      );

    const searchResults = await response;
    if (searchResults.error) {
      this.updateState(searchResults.error, []);
      this.handleFocus(false);
    } else if (searchResults.length) {
      this.updateState(null, [...searchResults]);
      this.handleFocus(false);
    } else if (!value.trim().length) {
      this.updateState(null, []);
      this.handleFocus(true);
    }
  };

  updateState = (error, searchResults) => {
    this.setState((currentState) => ({ error, searchResults }));
  };

  clearQuery = () => {
    this.updateState(null, null);
    this.input.current.value = "";
  };

  render() {
    const { searchResults, error, focus } = this.state;
    const { onShelfChange } = this.props;
    const terms = [
      "Android",
      "Art",
      "Artificial Intelligence",
      "Astronomy",
      "Austen",
      "Baseball",
      "Basketball",
      "Bhagat",
      "Biography",
      "Brief",
      "Business",
      "Camus",
      "Cervantes",
      "Christie",
      "Classics",
      "Comics",
      "Cook",
      "Cricket",
      "Cycling",
      "Desai",
      "Design",
      "Development",
      "Digital Marketing",
      "Drama",
      "Drawing",
      "Dumas",
      "Education",
      "Everything",
      "Fantasy",
      "Film",
      "Finance",
      "First",
      "Fitness",
      "Football",
      "Future",
      "Games",
      "Gandhi",
      "Homer",
      "Horror",
      "Hugo",
      "Ibsen",
      "Journey",
      "Kafka",
      "King",
      "Lahiri",
      "Larsson",
      "Learn",
      "Literary Fiction",
      "Make",
      "Manage",
      "Marquez",
      "Money",
      "Mystery",
      "Negotiate",
      "Painting",
      "Philosophy",
      "Photography",
      "Poetry",
      "Production",
      "Programming",
      "React",
      "Redux",
      "River",
      "Robotics",
      "Rowling",
      "Satire",
      "Science Fiction",
      "Shakespeare",
      "Singh",
      "Swimming",
      "Tale",
      "Thrun",
      "Time",
      "Tolstoy",
      "Travel",
      "Ultimate",
      "Virtual Reality",
      "Web Development",
      "iOS",
    ];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyUp={this.onSearch}
              ref={this.input}
            />
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
                  <SearchTerms term={term} />
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
            {<p className="error-message">{error && "No Results Found!"}</p>}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
