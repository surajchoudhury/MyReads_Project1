import React from "react";

const SearchTerms = (props) => {
  return (
    <div className="search_terms" >
      [<span >{props.term}</span>]
    </div>
  );
};

export default SearchTerms;
