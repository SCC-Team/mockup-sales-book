import React from "react";
import './Searcher.css';

export const Searcher = () => {
  return (
    <aside className="searcher">
      <div className="search-container">
        <input type="text" placeholder="Search" name="search" />
      </div>
    </aside>
  );


}