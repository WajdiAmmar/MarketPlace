import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = () => {
  const [showCheckout, setShowCheckout] = useState(true); 

  const handleCloseCheckout = () => setShowCheckout(false);

  return (
    <div>
      {showCheckout && <CheckoutForm show={showCheckout} handleClose={handleCloseCheckout} />}
    </div>
  );
};

export default CheckoutPage;
