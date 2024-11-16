// components/CardGrid.js
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'; // Importation des composants nécessaires
import '../Styles/card.css'; // Assure-toi que ce fichier est bien importé
import { useDispatch, useSelector } from 'react-redux'; // Importation de redux pour l'état global
import { addToCart, incrementQuantity } from '../actions/cartActions'; // Importation des actions
import Swal from 'sweetalert2'; // Importation de SweetAlert2

const CardGrid = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const connected = useSelector((state) => state.auth.isAuthenticated); // Vérification si l'utilisateur est connecté

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product) => {
    if (connected) {
      const existingProduct = cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        dispatch(incrementQuantity(product.id)); // Incrémente la quantité si déjà dans le panier
      } else {
        dispatch(addToCart(product)); // Ajoute le produit au panier
      }
    } else {
      // Remplacement de l'alerte native par un SweetAlert2
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour ajouter des produits au panier.',
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

  return (
    <div className="content-layout">
      <Row xs={1} md={2} lg={4} className="g-4"> 
        {products.map((product) => (
          <Col key={product.id}>
            <div className="product-card">
              {/* Conteneur d'image */}
              <div className="product-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              {/* Informations produit */}
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">{product.price} DT</p>
              <p className="product-description">{product.description}</p>
              <Button 
                className="buy-now-button"
                onClick={() => handleAddToCart(product)} // Appel à la fonction interne de gestion du panier
              >
                Ajouter au panier
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardGrid;
