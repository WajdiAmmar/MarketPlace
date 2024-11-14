// PaymentPage.js

import React from 'react';
import { Button } from 'react-bootstrap';
import PaymentInfo from '../components/PaymentInfo';

const PaymentPage = ({ onPrevious, onConfirm }) => {
  return (
    <div>
      <h2>Informations de Paiement</h2>
      <PaymentInfo />
      <div className="button-group">
        <Button variant="secondary" onClick={onPrevious}>
          Précédent
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Confirmer
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
