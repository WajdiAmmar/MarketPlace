// DeliveryPage.js

import React from 'react';
import { Button } from 'react-bootstrap';
import DeliveryMethod from '../components/DeliveryMethod';

const DeliveryPage = ({ onNext, onPrevious }) => {
  return (
    <div>
      <DeliveryMethod />
      <div className="button-group">
        <Button variant="secondary" onClick={onPrevious}>
          Précédent
        </Button>
        <Button variant="primary" onClick={onNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default DeliveryPage;
