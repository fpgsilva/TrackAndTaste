import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(searchQuery);
      navigate("/SearchResults", { state: { query: searchQuery } });
    } else {
      console.log("Please enter a search query.");
      alert("Please enter a search query.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-icon" onClick={handleSearch}>
        <i className="fas fa-search"></i> {/* Font Awesome search icon */}
      </div>
      <input
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search by Title, Ingredient, Type of Dish..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
