import {useState} from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); //Update state with the input value
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); //Prevent page reload
        console.log("Searching for:", searchTerm);
        if (onSearch) {
          onSearch(searchTerm); //Pass the search term to the parent via the callback
        }
    };

  return (
    <form onSubmit={handleSearchSubmit} className="search-container">
      <input
        id="search"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;