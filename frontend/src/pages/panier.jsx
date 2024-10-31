import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Panier = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bottes Benyl XL - Doublure Softex',
      price: 77.0,
      quantity: 1,
      category: 'Chaussures',
      condition: 'Neuf',
      description: 'Bottes de protection confortables avec doublure Softex, idéales pour la randonnée en terrain humide.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Gants de Protection en Cuir',
      price: 25.0,
      quantity: 2,
      category: 'Accessoires',
      condition: 'Neuf',
      description: 'Gants de protection résistants, fabriqués en cuir véritable pour une durabilité maximale.',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
            {cartItems.length === 0 ? (
              <Alert variant="info">Votre panier est vide.</Alert>
            ) : (
              <>
                <Row>
                  <Col md={8} className="bg-hover-light shadow text-black p-4 ml-5 mt-2 mb-5 container">
                    {cartItems.map((item) => (
                      <Row key={item.id} className="mb-4 align-items-center">
                        <Col xs={3}>
                          <img src={item.image} alt={item.name} width="150" />
                        </Col>
                        <Col xs={8}>
                          <p className="mb-1 font-weight-bold">{item.name}</p>
                          <p className="mb-0 text-muted">
                            <strong>Prix:</strong> {item.price.toFixed(2)} DT
                          </p>
                          <p className="mb-0 text-muted">
                            <strong>Catégorie:</strong> {item.category}
                          </p>
                          <p className="mb-0 text-muted">
                            <strong>État:</strong> {item.condition}
                          </p>
                          <p className="mb-0 text-muted">
                            <strong>Description:</strong> {item.description}
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
                        variant="outine-light"
                        className="w-100 my-3 bg-black"
                        id="connecter-btn"
                        size="lg"
                      >
                        Valider mon panier
                      </Button >
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
    </div>
  );
};

export default Panier;
