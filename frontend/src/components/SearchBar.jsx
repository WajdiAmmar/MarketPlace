import React from 'react';
import '../Styles/SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher" 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => onSearchChange(e.target.value)} 
        />
        <button className="search-button">
          <img src="/search-icon.png" alt="search" className="search-icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
