import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../Styles/card.css'; // Style du composant
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const CardGrid = ({ products, isMyProductsPage, handleDelete }) => {
  const isConnected = useSelector((state) => state.auth.isAuthenticated); // Vérifie si l'utilisateur est connecté
  const userId = useSelector((state) => state.auth.user?.ID); // ID de l'utilisateur connecté

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = async (product) => {
    if (!isConnected) {
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez être connecté pour ajouter des produits au panier.',
        confirmButtonText: 'Se connecter',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; // Redirige vers la page de connexion
        }
      });
      return;
    }

    try {
      // Requête vers le backend pour ajouter le produit
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId,
          product,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Ajouté au panier',
          text: `${product.title} a été ajouté avec succès !`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: data.message || 'Une erreur est survenue.',
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur interne est survenue.',
      });
    }
  };

  // Fonction pour supprimer un produit
  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action supprimera définitivement le produit.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(productId);
      }
    });
  };

  return (
    <div className="content-layout">
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <div className="product-card">
              {/* Image produit */}
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

              {/* Ajout de la quantité du produit */}
              <p className="product-quantity">Quantité : {product.quantity}</p>

              {/* Bouton conditionnel */}
              {isMyProductsPage ? (
                <Button
                  className="buy-now-button"
                  onClick={() => handleDeleteClick(product.id)} // Supprimer le produit
                >
                  Supprimer
                </Button>
              ) : (
                <Button
                  className="buy-now-button"
                  onClick={() => handleAddToCart(product)} // Ajouter au panier
                >
                  Ajouter au panier
                </Button>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardGrid;
