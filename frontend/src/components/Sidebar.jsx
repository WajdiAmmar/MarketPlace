import { Button, Form } from 'react-bootstrap';
import '../Styles/sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ onCategoryChange = () => {}, onPriceChange = () => {} }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(20000); // Starting with max price

  const handleAddProductClick = () => {
    navigate('/ajoutProduit');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onCategoryChange(e.target.value); // Appeler la fonction de changement de catégorie
  };

  const handlePriceChange = (value) => {
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
        <li className="list-group-item">
          <Form.Label>Catégorie</Form.Label>
          <div>
            <Form.Check 
              type="radio" 
              label="Toutes les catégories" 
              value="" 
              checked={selectedCategory === ''}
              onChange={handleCategoryChange} 
            />
            <Form.Check 
              type="radio" 
              label="High-Tech" 
              value="High-Tech" 
              checked={selectedCategory === 'High-Tech'}
              onChange={handleCategoryChange} 
            />
            <Form.Check 
              type="radio" 
              label="Cuisine et maison" 
              value="Cuisine et maison" 
              checked={selectedCategory === 'Cuisine et maison'}
              onChange={handleCategoryChange} 
            />
            <Form.Check 
              type="radio" 
              label="Beauté" 
              value="Beauté" 
              checked={selectedCategory === 'Beauté'}
              onChange={handleCategoryChange} 
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
            min={0}
            max={20000}
            step={50}
            className="form-range"
          />
          <p className="text-muted">Prix maximum: {price} DT</p>
        </li>
      </ul>
      <Button block="true" variant="outline-light" id="connecter-btn" onClick={handleAddProductClick}>
        Ajouter Votre Produit
      </Button>
    </div>
  );
};

export default Sidebar;
