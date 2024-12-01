import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import "../Styles/checkout.css";
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.ID);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError("Vous devez être connecté pour accéder au panier.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/cart/cart/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.data.products || []);
        } else {
          setError(data.message || 'Erreur lors du chargement du panier.');
        }
      } catch (err) {
        setError('Erreur réseau ou serveur.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleUpdateQuantity = async (productId, change) => {
    try {
      const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/cart/update-quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, change }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(data.products || []);
      } else {
        alert(data.message || 'Erreur lors de la mise à jour de la quantité.');
      }
    } catch (error) {
      alert('Erreur réseau ou serveur. Veuillez réessayer plus tard.');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/cart/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Mettez à jour cartItems avec les produits restants
        setCartItems(data.products || []);
        
        Swal.fire({
          icon: 'success',
          title: 'Produit supprimé',
          text: 'Le produit a été supprimé de votre panier.',
        });
      } else {
        alert(data.message || 'Erreur lors de la suppression du produit.');
      }
    } catch (error) {
      alert('Erreur réseau ou serveur. Veuillez réessayer plus tard.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Panier vide',
        text: 'Ajoutez des produits avant de passer à la commande.',
      });
      return;
    }
  
    try {
      for (const item of cartItems) {
        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/products/${item.id}`);
        const productData = await response.json();
  
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: `Erreur lors de la vérification du produit ${item.title}.`,
          });
          return;
        }
  
        // Comparaison des quantités
        if (productData.quantity === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Produit indisponible',
            text: `Le produit "${item.title}" est en rupture de stock.`,
          });
          return;
        }
  
        if (item.quantity > productData.quantity) {
          Swal.fire({
            icon: 'warning',
            title: 'Quantité insuffisante',
            text: `La quantité demandée pour "${item.title}" dépasse le stock disponible (${productData.quantity}).`,
          });
          return;
        }
      }
  
      // Si tout est OK, procéder à la validation
      navigate('/checkout');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la vérification des produits. Veuillez réessayer.',
      });
    }
  };
  
  return (
    <div className="bg-white">
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          <Sidebar />
        </div>
        <div className="col-xl-10">
          <Container className="mt-5">
            <h1>Votre Panier</h1>
            {loading ? (
              <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : cartItems.length === 0 ? (
              <Alert variant="info">Votre panier est vide.</Alert>
            ) : (
              <>
                <Row>
                  <Col md={8} className="bg-hover-light shadow text-black p-4 ml-5 mt-2 mb-5 container">
                    {cartItems.map((item) => (
                      <Row key={item.id} className="mb-4 align-items-center">
                        <Col xs={3}>
                          <img src={item.imageUrl} alt={item.title} width="150" />
                        </Col>
                        <Col xs={8}>
                          <p className="mb-1 font-weight-bold">{item.title}</p>
                          <p className="mb-0 text-muted">
                            <strong>Prix:</strong> {item.price.toFixed(2)} DT
                          </p>
                          <div className="d-flex align-items-center my-3">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              disabled={item.quantity === 1}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-3"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Supprimer
                          </Button>
                        </Col>
                        <Col xs={12} className="d-flex justify-content-end">
                          <p>
                            <span className="text-danger font-weight-bold">
                              {item.price.toFixed(2)} DT x {item.quantity}
                            </span>
                            <span className="ml-2">
                              = {(item.price * item.quantity).toFixed(2)} DT
                            </span>
                          </p>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col md={4}>
                    <div className="p-3 border rounded bg-hover-light shadow text-black p-4 ml-5 mt-2 mb-5 container">
                      <h5>Récapitulatif</h5>
                      <ul>
                        {cartItems.map((item) => (
                          <li key={item.id}>
                            {item.title} : {item.price.toFixed(2)} DT x {item.quantity} ={' '}
                            {(item.price * item.quantity).toFixed(2)} DT
                          </li>
                        ))}
                      </ul>
                      <div className="d-flex justify-content-between mt-3">
                        <span>Total de la commande</span>
                        <span>{calculateTotal().toFixed(2)} DT</span>
                      </div>
                      <Button
                        variant="outline-light"
                        className="w-100 my-3 bg-black"
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Valider mon panier
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Panier;
