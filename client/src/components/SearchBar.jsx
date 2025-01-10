import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    
    navigate(`/search-results?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;