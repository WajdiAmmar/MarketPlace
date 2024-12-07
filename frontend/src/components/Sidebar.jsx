import { Button, Form } from 'react-bootstrap';
import '../Styles/sidebar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Sidebar = ({ onCategoryChange = () => {}, onPriceChange = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(10000); // Prix maximal par défaut
  const connected = useSelector((state) => state.auth.isAuthenticated);

  // Réinitialiser la catégorie si on n'est pas sur la page d'accueil
  useEffect(() => {
    if (location.pathname !== '/') {
      setSelectedCategory(''); // Réinitialiser la catégorie sur une autre page
    }
  }, [location.pathname]);

  // Fonction pour gérer le clic sur "Ajouter un produit"
  const handleAddProductClick = () => {
    if (connected) {
      navigate('/ajoutProduit');
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
          window.location.href = '/login'; // Rediriger vers la page de connexion
        }
      });
    }
  };

  // Fonction pour gérer le changement de catégorie
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
    onCategoryChange(e.target.value);
  };

  // Fonction pour gérer le changement de prix
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

        {/* Affichage du filtrage par catégorie seulement sur la page d'accueil */}
        {(location.pathname === '/' || location.pathname === '/mesproduits' || location.pathname === '/products')&& (
          <li className="list-group-item">
            <Form.Label>Catégorie</Form.Label>
            <div>
              {/* Vérification si l'utilisateur est connecté avant d'activer le filtrage */}
              <Form.Check 
                type="radio" 
                label="Toutes les catégories" 
                value="" 
                checked={selectedCategory === ''}
                onChange={handleCategoryChange} 
                disabled={!connected} 
              />
              <Form.Check 
                type="radio" 
                label="High-Tech" 
                value="High-Tech" 
                checked={selectedCategory === 'High-Tech'}
                onChange={handleCategoryChange} 
                disabled={!connected} 
              />
              <Form.Check 
                type="radio" 
                label="Cuisine et maison" 
                value="Cuisine et maison" 
                checked={selectedCategory === 'Cuisine et maison'}
                onChange={handleCategoryChange} 
                disabled={!connected} 
              />
              <Form.Check 
                type="radio" 
                label="Beauté" 
                value="Beauté" 
                checked={selectedCategory === 'Beauté'}
                onChange={handleCategoryChange} 
                disabled={!connected} 
              />
            </div>
          </li>
        )}

        {/* Filtrage par prix */}
        <li className="list-group-item">
          <Form.Label>Filtrer par Prix (0 - {price} DT)</Form.Label>
          <Form.Control
            type="range"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            min={0}
            max={10000}
            step={100}
            className="form-range"
            disabled={!connected} // Désactiver si l'utilisateur n'est pas connecté
          />
        </li>
      </ul>
      {/* Bouton pour ajouter un produit, redirige vers la page de connexion si non connecté */}
      <Button block="true" variant="outline-light" id="connecter-btn" onClick={handleAddProductClick}>
        Ajouter Votre Produit
      </Button>
    </div>
  );
};

export default Sidebar;
