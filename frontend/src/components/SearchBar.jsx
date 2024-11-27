import React from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la navigation
import { useSelector } from 'react-redux'; // Pour accéder à l'état global de Redux
import Swal from 'sweetalert2';
import '../Styles/SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  const navigate = useNavigate(); // Pour la navigation
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Récupère l'état de connexion de Redux

  const handleSearch = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Connectez-vous',
        text: 'Vous devez être connecté pour effectuer une recherche.',
        confirmButtonText: 'Se connecter',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirige vers la page de connexion
        }
      });
    } else {
      // Si l'utilisateur est connecté, effectuez la recherche
      // Vous pouvez ajouter une fonction de recherche ici si nécessaire
      console.log('Recherche pour:', searchTerm);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Rechercher" 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => onSearchChange(e.target.value)} 
          onClick={handleSearch}
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="/search-icon.png" alt="search" className="search-icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
