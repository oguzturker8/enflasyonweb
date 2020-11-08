import React from "react";

export default function Search({ search, handleSearch }) {
  return (
    <div className="searchWrapper">
      <box-icon name="search" color="#2e2e2e" />
      <input
        type="text"
        className="search"
        placeholder="Search by  a name."
        value={search}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
}
