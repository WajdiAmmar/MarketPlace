// PaymentPage.js

import React from 'react';
import { Button } from 'react-bootstrap';
import PaymentInfo from '../components/PaymentInfo';

const PaymentPage = ({ onPrevious, onConfirm }) => {
  return (
    <div>
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
