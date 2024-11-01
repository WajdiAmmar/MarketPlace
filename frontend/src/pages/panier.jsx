import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/CartContext'; // Importer le contexte
import CheckoutForm from './CheckoutForm'; // Importer le formulaire

const Panier = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart(); // Accéder aux items du panier et aux fonctions
  const [showCheckout, setShowCheckout] = useState(false); // État pour gérer l'affichage du formulaire

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleShowCheckout = () => setShowCheckout(true); // Ouvrir le formulaire
  const handleCloseCheckout = () => setShowCheckout(false); // Fermer le formulaire

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
            {cartItems.length === 0 ? (
              <Alert variant="info">Votre panier est vide.</Alert>
            ) : (
              <>
                <Row>
                  <Col md={8} className="bg-hover-light shadow text-black p-4 ml-5 mt-2 mb-5 container">
                    {cartItems.map((item) => (
                      <Row key={item.id} className="mb-4 align-items-center">
                        <Col xs={3}>
                          <img src={item.imageUrl} alt={item.title} width="150" /> {/* Afficher l'image */}
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
                              onClick={() => decrementQuantity(item.id)}
                              disabled={item.quantity === 1}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="danger"
                            size="sm"
                            className="ml-3"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Supprimer
                          </Button>
                        </Col>
                        <Col xs={12} className="d-flex justify-content-end">
                          <div>
                            <p>
                              <span className="text-danger font-weight-bold">
                                {item.price.toFixed(2)} DT x {item.quantity}
                              </span>
                              <span className="ml-2">
                                = {(item.price * item.quantity).toFixed(2)} DT
                              </span>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col md={4}>
                    <div className="p-3 border rounded bg-hover-light shadow text-black p-4 ml-5 mt-2 mb-5 container">
                      <h5>Récapitulatif</h5>
                      <div className="d-flex justify-content-between">
                        <span>Total de la commande</span>
                        <span>{calculateTotal().toFixed(2)} DT</span>
                      </div>
                      <Button
                        variant="outline-light"
                        className="w-100 my-3 bg-black"
                        id="connecter-btn"
                        size="lg"
                        onClick={handleShowCheckout} // Ouvrir le formulaire au clic
                      >
                        Valider mon panier
                      </Button>
                      <p className="text-center">
                        <a href="/" className='text-warning'>Ou poursuivre les achats</a>
                      </p>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </div>
      <Footer />
      <CheckoutForm show={showCheckout} handleClose={handleCloseCheckout} /> {/* Afficher le formulaire ici */}
    </div>
  );
};

export default Panier;