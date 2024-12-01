import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PersonalInfoForm from './PersonalInfo';
import DeliveryForm from './DeliveryMethod';
import PaymentForm from './PaymentInfo';
import "../Styles/checkout.css";

const CheckoutForm = () => {
  const userId = useSelector((state) => state.auth.user?.ID);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  // State pour les données du formulaire
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
    cvv: '',
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
          setError("Vous devez être connecté pour voir votre panier.");
          return;
        }

        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/cart/cart/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.data.products || []);
        } else {
          setError(data.message || "Erreur lors de la récupération du panier.");
        }
      } catch (err) {
        setError("Erreur réseau ou serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Calculer le total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handlers pour changer de section
  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Mise à jour des données du formulaire
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Container className="checkout-page">
      <Row>
        {/* Colonne gauche : Formulaires */}
        <Col md={8} className="form-section">
          {step === 1 && (
            <PersonalInfoForm
              formData={formData}
              onNext={handleNext}
              onChange={handleFormDataChange}
            />
          )}
          {step === 2 && (
            <DeliveryForm
              formData={formData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onChange={handleFormDataChange}
            />
          )}
          {step === 3 && (
            <PaymentForm
              formData={formData}
              onPrevious={handlePrevious}
              onChange={handleFormDataChange}
            />
          )}
        </Col>

        {/* Colonne droite : Récapitulatif de la commande */}
        <Col md={4} className="summary-section order-summary">
          <h3>Récapitulatif de la Commande</h3>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="summary-content">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <p>{item.title}</p>
                  <p>
                    {item.price.toFixed(2)} DT x {item.quantity} ={' '}
                    {(item.price * item.quantity).toFixed(2)} DT
                  </p>
                </div>
              ))}
              <hr />
              <div className="user-info">
                <h4>Informations du Client</h4>
                <p>Nom complet: {formData.fullName}</p>
                <p>Téléphone: {formData.phoneNumber}</p>
                <p>Email: {formData.email}</p>
                <p>
                  Adresse: {formData.address}, {formData.city},{' '}
                  {formData.postalCode}
                </p>
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
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
