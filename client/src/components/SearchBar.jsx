import {useState} from 'react';
import './SearchBar.css';

function SearchBar({ data, onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); //Call the onSearch function with the new search term
    };

    return (
        <div className="search-bar-container">
        <h2>Search Bar</h2>
            <form onSubmit={handleInputChange}>
                <label htmlFor='Search'>Search</label>
                    <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                     onChange={handleInputChange}
                    required
                     />
            <button type="submit">Search</button>
        </form>
        </div>
    );
}

export default SearchBar;