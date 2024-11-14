import React from 'react';
import { Button } from 'react-bootstrap';

const Confirmation = () => {
  return (
    <div>
      <h3>Confirmation</h3>
      <p>Votre commande est prête à être confirmée !</p>
      <Button variant="success">Confirmer</Button>
    </div>
  );
};

export default Confirmation;
