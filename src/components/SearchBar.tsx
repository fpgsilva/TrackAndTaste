import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Logic to handle search can go here (e.g., API call or passing the searchQuery to a parent component)
      window.location.href = `/Search-results.html?query=${encodeURIComponent(searchQuery)}`;
    } else {
      console.log("Please enter a search query.");
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