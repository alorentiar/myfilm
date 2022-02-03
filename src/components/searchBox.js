import React from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../App.css";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input className="form-control" value={props.value} onChange={(event) => props.setSearchVal(event.target.value)} placeholder="Type to search..."></input>
    </div>
  );
};

export default SearchBox;
