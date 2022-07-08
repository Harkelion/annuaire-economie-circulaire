import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, entry, stateChanger, filter, ...rest }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    filter(event.target.value.toLowerCase());
    setWordEntered(searchWord);
    const newFilter = entry.filter((value) => {
      return value.properties.description
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    filter("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {" "}
          <p className="info"> cliquez pour voir </p>
          {filteredData.slice(0, 6).map((value, key) => {
            return (
              <button
                className="dataItem"
                onClick={() => {
                  stateChanger([
                    value.geometry.coordinates[1] - 0.0015,
                    value.geometry.coordinates[0],
                    16
                  ]);
                }}
              >
                <p>{value.properties.name}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
