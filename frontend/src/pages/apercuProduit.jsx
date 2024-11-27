import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ApercuProduit = () => {
  const { productId } = useParams(); // Récupère l'ID depuis l'URL
  const [product, setProduct] = useState(null);
  const userId = useSelector((state) => state.auth.user?.ID);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Produit introuvable.',
          });
          navigate('/'); // Redirige vers la page d'accueil en cas d'erreur
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
      }
    };

    fetchProduct();
  }, [productId, navigate]);
  const handleAddToCart = async () => {
    if (product && product.quantity > 0) {
      try {
        const response = await fetch('http://localhost:5000/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            product,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
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
        console.error('Erreur lors de l\'ajout au panier:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout au panier.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Stock épuisé',
        text: 'Ce produit est actuellement en rupture de stock.',
      });
    }
  };
  
  if (!product) return <p>Chargement...</p>;

  return (
    <div className='bg-light'>
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-xl-10">
          <Container className="mt-4">
            <Row>
              <Col md={6} className="d-flex justify-content-center mb-4">
                {/* Image produit */}
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="product-image-large img-fluid" 
                  style={{ maxHeight: '400px', objectFit: 'contain' }} 
                />
              </Col>
              <Col md={6}>
                {/* Informations produit */}
                <h1>{product.title}</h1>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Catégorie:</strong> {product.category}</p>
                <p><strong>Prix:</strong> {product.price} DT</p>
                <p><strong>Quantité disponible:</strong> {product.quantity}</p>
                <p><strong>État:</strong> {product.condition}</p>

                {/* Bouton ajouter au panier */}
                <Button 
                  className="buy-now-button" 
                  onClick={handleAddToCart} 
                  variant="primary"
                  disabled={product.quantity <= 0}
                >
                  Ajouter au panier
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApercuProduit;
