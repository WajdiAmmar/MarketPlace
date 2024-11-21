import React, { useState } from 'react';
import InputMask from 'react-input-mask'; // Importer InputMask
import Swal from 'sweetalert2'; // Importer SweetAlert2
import '../Styles/alert.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const PaymentForm = ({ formData, onPrevious, onChange }) => {

  const navigate = useNavigate();
  const userId=useSelector((state)=>state.auth.user?.ID);

  const [errors, setErrors] = useState({
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
    validateField(name, value); // Revalidate le champ à chaque changement
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'cardName':
        if (!value) {
          errorMessage = 'Le nom du titulaire est requis.';
        }
        break;
      case 'cardNumber':
        if (!value) {
          errorMessage = 'Le numéro de carte est requis.';
        } else if (!/^\d{16}$/.test(value)) {
          errorMessage = 'Le numéro de carte doit comporter 16 chiffres.';
        }
        break;
      case 'expirationDate':
        if (!value) {
          errorMessage = 'La date d\'expiration est requise.';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          errorMessage = 'La date d\'expiration doit être au format MM/AA (ex: 12/23).';
        }
        break;
      case 'cvv':
        if (!value) {
          errorMessage = 'Le code CVV est requis.';
        } else if (!/^\d{3}$/.test(value)) {
          errorMessage = 'Le code CVV doit comporter 3 chiffres.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Fonction qui valide tous les champs avant d'envoyer la commande
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    // Vérification de chaque champ et ajout des erreurs correspondantes
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      switch (field) {
        case 'cardName':
          if (!value) {
            newErrors.cardName = 'Le nom du titulaire est requis.';
            isValid = false;
          }
          break;
        case 'cardNumber':
          if (!value) {
            newErrors.cardNumber = 'Le numéro de carte est requis.';
            isValid = false;
          } else if (!/^\d{16}$/.test(value)) {
            newErrors.cardNumber = 'Le numéro de carte doit comporter 16 chiffres.';
            isValid = false;
          }
          break;
        case 'expirationDate':
          if (!value) {
            newErrors.expirationDate = 'La date d\'expiration est requise.';
            isValid = false;
          } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
            newErrors.expirationDate = 'La date d\'expiration doit être au format MM/AA (ex: 12/23).';
            isValid = false;
          }
          break;
        case 'cvv':
          if (!value) {
            newErrors.cvv = 'Le code CVV est requis.';
            isValid = false;
          } else if (!/^\d{3}$/.test(value)) {
            newErrors.cvv = 'Le code CVV doit comporter 3 chiffres.';
            isValid = false;
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors); // Mettre à jour l'état des erreurs
    return isValid;
  };

  const handleConfirmOrder = async () => {
    const isValid = validateAllFields();
  
    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez corriger les erreurs avant de confirmer la commande.',
      });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/confirmOrder/confirm-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, userId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue.');
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Commande confirmée',
        text: data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/'); // Redirige vers la page d'accueil ou autre page
        }
      });
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message,
      });
    }
  };
  

  return (
    <div className="form-container">
      <h2>Informations de paiement</h2>
      
      <label>Nom du titulaire de la carte</label>
      <input
        type="text"
        name="cardName"
        placeholder="Nom du titulaire"
        value={formData.cardName}
        onChange={handleChange}
      />
      {errors.cardName && <small style={{ color: 'red' }}>{errors.cardName}</small>}

      <label>Numéro de la carte</label>
      <input
        type="text"
        name="cardNumber"
        placeholder="Numéro de la carte"
        value={formData.cardNumber}
        onChange={handleChange}
      />
      {errors.cardNumber && <small style={{ color: 'red' }}>{errors.cardNumber}</small>}

      <label>Date d'expiration (MM/AA)</label>
      <InputMask
        mask="99/99" // Masque pour le format MM/AA
        name="expirationDate"
        placeholder="MM/AA"
        value={formData.expirationDate}
        onChange={handleChange}
      />
      {errors.expirationDate && <small style={{ color: 'red' }}>{errors.expirationDate}</small>}

      <label>Code CVV</label>
      <input
        type="password"
        name="cvv"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleChange}
      />
      {errors.cvv && <small style={{ color: 'red' }}>{errors.cvv}</small>}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onPrevious}>Précédent</button>
        <button onClick={handleConfirmOrder} variant="success">Confirmer la commande</button>
      </div>
    </div>
  );
};

export default PaymentForm;
