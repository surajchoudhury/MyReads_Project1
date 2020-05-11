import React from "react";

const SearchTerms = (props) => {
  return (
    <div style={{ padding: "5px",color:"green" }}>
      [<span style={{fontSize:"14px",color:"rgba(0,0,0,.5)",padding:"5px"}}>{props.term}</span>]
    </div>
  );
};

export default SearchTerms;
