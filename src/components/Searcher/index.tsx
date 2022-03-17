import React, { useState } from "react";

import "../../sass/main.scss";
import "../../sass/abstracts.scss";

export const Searcher = () => {
  const [formValues, setFormState] = useState({ searchText: "" });
  const handleInputChange = (e: any) => {
    const valor = e.target.value;
    setFormState({ searchText: valor });
  };

  const { searchText } = formValues;

  const handleInputChangeText = (e: any) => {
    e.preventDefault();
  };

  const handleInputChangeTo = (e: any) => {
    const valor = e.target.value;
  };

  return (
    <div className="flex-container">

      <section className="table-files--tools">
        <div className="search-component">
          <div className="input-search">
            <input
              type="text"
              placeholder="Buscar"
              name="searchText"
              autoComplete="off"
              value={searchText}
              maxLength={50}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn-icon"
            onClick={handleInputChangeText}
          >
            <span className="icofont-search-2"></span>
          </button>
        </div>
      </section>
    </div>
  );
};
