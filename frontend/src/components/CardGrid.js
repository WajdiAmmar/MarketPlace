import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../Styles/card.css'; // Style du composant
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import des icônes
import { useNavigate } from 'react-router-dom';

const CardGrid = ({ products, isMyProductsPage, handleDelete, handleUpdate }) => {
  const isConnected = useSelector((state) => state.auth.isAuthenticated); // Vérifie si l'utilisateur est connecté
  const userId = useSelector((state) => state.auth.user?.ID); // ID de l'utilisateur connecté
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
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
    navigate(`/apercuproduit/${productId}`); // Redirige vers la page d'aperçu du produit
  };
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

    // Vérifier la quantité disponible
    if (product.quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Stock épuisé',
        text: 'Ce produit est actuellement en rupture de stock.',
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
        })
        
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

  // Fonction pour afficher la popup de modification
  const handleEditClick = (product) => {
    Swal.fire({
      title: '<h3 style="color:#333; margin-bottom:10px;">Modifier le produit</h3>',
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
          <div>
            <label for="edit-title" style="font-weight:bold; color:#555;">Titre :</label>
            <input id="edit-title" class="swal2-input" value="${product.title}" placeholder="Titre" style="margin-top:5px;">
          </div>
  
          <div>
            <label for="edit-price" style="font-weight:bold; color:#555;">Prix :</label>
            <input id="edit-price" class="swal2-input" type="number" value="${product.price}" placeholder="Prix" style="margin-top:5px;">
          </div>
  
          <div>
            <label for="edit-description" style="font-weight:bold; color:#555;">Description :</label>
            <textarea id="edit-description" class="swal2-textarea" placeholder="Description" style="margin-top:5px;">${product.description}</textarea>
          </div>
  
          <div>
            <label for="edit-quantity" style="font-weight:bold; color:#555;">Quantité :</label>
            <input id="edit-quantity" class="swal2-input" type="number" value="${product.quantity}" placeholder="Quantité" style="margin-top:5px;">
          </div>
  
          <div>
            <label for="edit-image" style="font-weight:bold; color:#555;">Nouvelle image (optionnel) :</label>
            <input id="edit-image" type="file" class="swal2-file" style="margin-top:5px;">
          </div>
        </div>
      `,
      confirmButtonText: '<span style="padding: 0 15px;"> Modifier</span>',
      showCancelButton: true,
      cancelButtonText: '<span style="padding: 0 15px;"> Annuler</span>',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
      preConfirm: () => {
        const title = document.getElementById('edit-title').value;
        const price = parseFloat(document.getElementById('edit-price').value);
        const description = document.getElementById('edit-description').value;
        const quantity = parseInt(document.getElementById('edit-quantity').value, 10);
        const image = document.getElementById('edit-image').files[0]; // Nouvelle image
  
        return { title, price, description, quantity, image };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { title, price, description, quantity, image } = result.value;
  
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('quantity', quantity);
        if (image) formData.append('image', image); // Ajouter l'image uniquement si elle est présente
  
        try {
          const response = await fetch(`http://localhost:5000/api/products/products/${product.id}`, {
            method: 'PUT',
            body: formData, // Envoi de données multipart
          });
  
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Produit modifié',
              text: 'Les informations du produit ont été mises à jour avec succès.',
            });
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la mise à jour.');
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de mettre à jour le produit.',
          });
        }
      }
    });
  };

  return (
    <div className="content-layout">
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <div
              className="product-card"
              style={{ cursor: 'pointer' }} // Indique que la carte est cliquable
            >
              {/* Image produit */}
              <div className="product-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-image"
                  onClick={() => handleCardClick(product.id)}
                />
              </div>

              <div  onClick={() => handleCardClick(product.id)}>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">{product.price} DT</p>
              <p className="product-description">{product.description}</p>

              {/* Indication de stock */}
              <p
                className={`stock-status ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}
              >
                {product.quantity > 0 ? 'En stock' : 'Non disponible'}
              </p>
              </div>
              {/* Actions */}
              {isMyProductsPage && (
                <div className="actions">
                  <FaEdit
                    className="action-icon edit-icon"
                    onClick={() => handleEditClick(product)}
                  />
                  <FaTrashAlt
                    className="action-icon delete-icon"
                    onClick={() => handleDeleteClick(product.id)}
                  />
                </div>
              )}
              {!isMyProductsPage && (
                <button
                  className="buy-now-button"
                  onClick={() => handleAddToCart(product)} // Ajouter au panier
                >
                  Ajouter au panier
                </button>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardGrid;
