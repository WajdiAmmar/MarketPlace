import React, { useEffect, useState } from 'react'; // Importation des hooks React
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // Importation des composants Bootstrap pour la mise en page
import { useSelector } from 'react-redux'; // Utilisation de Redux pour récupérer l'état global de l'application
import PersonalInfoForm from './PersonalInfo'; // Importation du formulaire d'informations personnelles
import DeliveryForm from './DeliveryMethod'; // Importation du formulaire de méthode de livraison
import PaymentForm from './PaymentInfo'; // Importation du formulaire d'informations de paiement
import "../Styles/checkout.css"; // Importation des styles CSS

const CheckoutForm = () => {
  // Récupération de l'ID de l'utilisateur connecté depuis Redux
  const userId = useSelector((state) => state.auth.user?.ID);

  // États locaux pour gérer le panier, le chargement, les erreurs et l'étape actuelle
  const [cartItems, setCartItems] = useState([]); // Contient les articles du panier
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles
  const [step, setStep] = useState(1); // Étape actuelle du formulaire de commande (1: informations personnelles, 2: livraison, 3: paiement)

  // États pour stocker les données du formulaire de commande
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

  // Utilisation de useEffect pour récupérer le panier de l'utilisateur dès que l'ID de l'utilisateur change
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
          setError("Vous devez être connecté pour voir votre panier."); // Si l'utilisateur n'est pas connecté
          return;
        }

        // Requête API pour récupérer les produits du panier de l'utilisateur
        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/cart/cart/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.data.products || []); // Si la réponse est OK, met à jour les produits du panier
        } else {
          setError(data.message || "Erreur lors de la récupération du panier."); // Affiche une erreur si la réponse est négative
        }
      } catch (err) {
        setError("Erreur réseau ou serveur."); // Affiche une erreur en cas de problème de réseau ou serveur
      } finally {
        setLoading(false); // Marque la fin du chargement
      }
    };

    fetchCart(); // Appel de la fonction pour récupérer le panier
  }, [userId]);

  // Fonction pour calculer le total de la commande
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Calcule le total en multipliant le prix et la quantité
  };

  // Fonctions pour naviguer entre les étapes du formulaire
  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3)); // Passer à l'étape suivante (jusqu'à l'étape 3)
  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1)); // Revenir à l'étape précédente (minimum étape 1)

  // Fonction pour mettre à jour les données du formulaire
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value })); // Met à jour la donnée spécifiée du formulaire
  };

  return (
    <Container className="checkout-page"> {/* Conteneur principal pour la page de commande */}
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
            <Spinner animation="border" /> // Affiche un spinner pendant le chargement des données
          ) : error ? (
            <Alert variant="danger">{error}</Alert> // Affiche un message d'erreur en cas de problème
          ) : (
            <div className="summary-content">
              {/* Affiche chaque élément du panier */}
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
              {/* Affiche les informations de l'utilisateur */}
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
              {/* Affiche la méthode de livraison sélectionnée */}
              <div className="delivery-info">
                <h4>Méthode de Livraison</h4>
                <p>{formData.deliveryMethod}</p>
              </div>
              {/* Affiche les informations de paiement */}
              <div className="payment-info">
                <h4>Informations de Paiement</h4>
                <p>Nom sur la carte: {formData.cardName}</p>
                <p>Numéro de carte: {formData.cardNumber}</p>
                <p>Date d'expiration: {formData.expirationDate}</p>
              </div>
              <hr />
              {/* Affiche le total de la commande */}
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

export default CheckoutForm; // Exportation du composant CheckoutForm
