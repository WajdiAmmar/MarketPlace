import React from 'react';
import '../Styles/SearchBar.css'; // Import du fichier CSS


function SearchBar() {
  return (
    <div className="search-container">
      <div className="search-bar">
        <input type="text" placeholder="E-commerce" className="search-input" />
        <button className="search-button">
          {/* Utilise le chemin relatif à public pour l'image */}
          <img src="/search-icon.png" alt="search" className="search-icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
