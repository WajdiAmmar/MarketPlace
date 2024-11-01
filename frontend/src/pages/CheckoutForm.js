// CheckoutForm.js
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CheckoutForm({ show, handleClose }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    securityCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données utilisateur et paiement :", userInfo);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Coordonnées de l'utilisateur et de paiement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <h5>Informations personnelles</h5>
          <Form.Group controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre nom"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Votre email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre adresse"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Votre numéro de téléphone"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <h5 className="mt-4">Informations de paiement</h5>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Numéro de carte</Form.Label>
            <Form.Control
              type="text"
              placeholder="Numéro de carte"
              name="cardNumber"
              value={userInfo.cardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formExpiryDate">
            <Form.Label>Date d'expiration</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/AA"
              name="expiryDate"
              value={userInfo.expiryDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSecurityCode">
            <Form.Label>Code de sécurité (CVV)</Form.Label>
            <Form.Control
              type="text"
              placeholder="CVV"
              name="securityCode"
              value={userInfo.securityCode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Soumettre
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutForm;