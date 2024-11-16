// actions/cartActions.js

export const addToCart = (item) => ({
    type: 'ADD_TO_CART',
    payload: item,
  });
  
  export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    payload: { id },
  });
  
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  });
  
  export const incrementQuantity = (id) => ({
    type: 'INCREMENT_QUANTITY',
    payload: { id },
  });
  
  export const decrementQuantity = (id) => ({
    type: 'DECREMENT_QUANTITY',
    payload: { id },
  });
  