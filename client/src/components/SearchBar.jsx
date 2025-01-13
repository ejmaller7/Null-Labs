import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handles changes in the search input field
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term state with the input value
  };

  // Handles the search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return; // Do nothing if the input is empty or contains only whitespace
    
    // Navigate to the search results page with the search term as a query parameter
    navigate(`/search-results?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={handleInputChange} // Update state on input change
          required // Ensure input is not empty before submission
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;