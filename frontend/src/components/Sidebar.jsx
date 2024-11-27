import { Button, Form } from 'react-bootstrap';
import '../Styles/sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Sidebar = ({ onCategoryChange = () => {}, onPriceChange = () => {} }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(10000); // Starting with max price
  const connected = useSelector((state) => state.auth.isAuthenticated);

  const handleAddProductClick = () => {
    if (connected) {
      navigate('/ajoutProduit'); // Si l'utilisateur est connecté, il peut accéder à l'ajout de produit
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour ajouter des produits.',
        confirmButtonText: 'Se connecter',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirige vers la page de connexion si l'utilisateur confirme
          window.location.href = '/login';
        }
      });
    }
  };

  const handleCategoryChange = (e) => {
    if (!connected) {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour filtrer par catégorie.',
      });
      return;
    }

    setSelectedCategory(e.target.value);
    onCategoryChange(e.target.value); // Appeler la fonction de changement de catégorie
  };

  const handlePriceChange = (value) => {
    if (!connected) {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour filtrer par prix.',
      });
      return;
    }

    setPrice(value);
    onPriceChange([0, value]); 
  };

  const handleCategoryClick = () => {
    if (!connected) {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour filtrer par catégorie.',
      });
    }
  };

  const handlePriceClick = () => {
    if (!connected) {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour filtrer par prix.',
      });
    }
  };

  return (
    <div className="col">
      <Button
        color="white"
        className="ms-auto text-white d-lg-none"
        onClick={() => document.getElementById("sidebarArea").classList.toggle("showSidebar")}
      >
        <i className="bi bi-x"></i>
      </Button>
      <ul className="list">
        <li className="list-group-item">
          <Link to="#">Filtrage</Link>
        </li>
        <li className="list-group-item">
          <Form.Label>Catégorie</Form.Label>
          <div>
            <Form.Check 
              type="radio" 
              label="Toutes les catégories" 
              value="" 
              checked={selectedCategory === ''}
              onChange={handleCategoryChange} 
              onClick={handleCategoryClick} // Affiche l'avertissement si l'utilisateur est déconnecté
              disabled={!connected} // Désactive les options si non connecté
            />
            <Form.Check 
              type="radio" 
              label="High-Tech" 
              value="High-Tech" 
              checked={selectedCategory === 'High-Tech'}
              onChange={handleCategoryChange} 
              onClick={handleCategoryClick} // Affiche l'avertissement si l'utilisateur est déconnecté
              disabled={!connected} // Désactive les options si non connecté
            />
            <Form.Check 
              type="radio" 
              label="Cuisine et maison" 
              value="Cuisine et maison" 
              checked={selectedCategory === 'Cuisine et maison'}
              onChange={handleCategoryChange} 
              onClick={handleCategoryClick} // Affiche l'avertissement si l'utilisateur est déconnecté
              disabled={!connected} // Désactive les options si non connecté
            />
            <Form.Check 
              type="radio" 
              label="Beauté" 
              value="Beauté" 
              checked={selectedCategory === 'Beauté'}
              onChange={handleCategoryChange} 
              onClick={handleCategoryClick} // Affiche l'avertissement si l'utilisateur est déconnecté
              disabled={!connected} // Désactive les options si non connecté
            />
            {/* Ajouter d'autres catégories ici si nécessaire */}
          </div>
        </li>
        <li className="list-group-item">
          <Form.Label>Filtrer par Prix (0 - {price} DT)</Form.Label>
          <Form.Control
            type="range"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            onClick={handlePriceClick} // Affiche l'avertissement si l'utilisateur est déconnecté
            min={0}
            max={10000}
            step={100}
            className="form-range"
            disabled={!connected} // Désactive le contrôle si non connecté
          />
        </li>
      </ul>
      <Button block="true" variant="outline-light" id="connecter-btn" onClick={handleAddProductClick}>
        Ajouter Votre Produit
      </Button>
    </div>
  );
};

export default Sidebar;
