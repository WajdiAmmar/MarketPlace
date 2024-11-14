import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import PersonalInfoForm from './PersonalInfo';
import DeliveryForm from './DeliveryMethod';
import PaymentForm from './PaymentInfo';
import axios from 'axios';
import "../Styles/checkout.css";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);

  // State pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: '',
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  // Calcul du total du panier
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handlers de navigation entre les étapes
  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Fonction pour mettre à jour les données du formulaire
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Fonction pour confirmer la commande et envoyer les données au backend
  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/confirm-order', { formData });
      alert(response.data.message); // Afficher un message de confirmation
    } catch (error) {
      console.error('Erreur lors de la confirmation de la commande:', error);
      alert('Une erreur est survenue lors de la confirmation de votre commande.');
    }
  };

  return (
    <Container className="checkout-page">
      <Row>
        {/* Colonne gauche : Formulaires */}
        <Col md={8} className="form-section">
          {step === 1 && (
            <div>
              <h2>Information du Client</h2>
              <PersonalInfoForm formData={formData} onNext={handleNext} onChange={handleFormDataChange} />
            </div>
          )}
          {step === 2 && (
            <div>
              <h2>Méthode de Livraison</h2>
              <DeliveryForm formData={formData} onNext={handleNext} onPrevious={handlePrevious} onChange={handleFormDataChange} />
            </div>
          )}
          {step === 3 && (
            <div>
              <h2>Informations de Paiement</h2>
              <PaymentForm formData={formData} onPrevious={handlePrevious} onChange={handleFormDataChange} />
            </div>
          )}
        </Col>

        {/* Colonne droite : Récapitulatif de la commande */}
        <Col md={4} className="summary-section order-summary">
          <h3>Récapitulatif de la Commande</h3>
          <div className="summary-content">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <p>{item.title}</p>
                <p>
                  {item.price.toFixed(2)} DT x {item.quantity} = {(item.price * item.quantity).toFixed(2)} DT
                </p>
              </div>
            ))}
            <hr />
            <div className="user-info">
              <h4>Informations du Client</h4>
              <p>Nom complet: {formData.fullName}</p>
              <p>Téléphone: {formData.phoneNumber}</p>
              <p>Email: {formData.email}</p>
              <p>Adresse: {formData.address}, {formData.city}, {formData.postalCode}</p>
            </div>
            <div className="delivery-info">
              <h4>Méthode de Livraison</h4>
              <p>{formData.deliveryMethod}</p>
            </div>
            <div className="payment-info">
              <h4>Informations de Paiement</h4>
              <p>Nom sur la carte: {formData.cardName}</p>
              <p>Numéro de carte: {formData.cardNumber}</p>
              <p>Date d'expiration: {formData.expirationDate}</p>
            </div>
            <hr />
            <div className="total">
              <strong>Total de la commande: </strong>
              <span>{calculateTotal().toFixed(2)} DT</span>
            </div>
            <Button onClick={handleConfirmOrder} variant="success">Confirmer la commande</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
