import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import PersonalInfoForm from './PersonalInfo';
import DeliveryForm from './DeliveryMethod';
import PaymentForm from './PaymentInfo';
import "../Styles/checkout.css";

const CheckoutForm = () => {
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);

  // State to manage form data
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Navigation handlers
  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Function to update form data
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Container className="checkout-page">
      <Row>
        {/* Left Column: Forms */}
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

        {/* Right Column: Order Summary */}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
