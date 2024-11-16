// reducers/cartReducer.js

// Récupérer les données du panier depuis le localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  cartItems: savedCart,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemExists = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCart;
      
      if (itemExists) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      
      // Sauvegarder le panier dans le localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...state,
        cartItems: updatedCart,
      };

    case 'REMOVE_FROM_CART':
      const newCart = state.cartItems.filter(item => item.id !== action.payload.id);
      
      // Sauvegarder le panier dans le localStorage après suppression
      localStorage.setItem('cart', JSON.stringify(newCart));
      
      return {
        ...state,
        cartItems: newCart,
      };

    case 'CLEAR_CART':
      // Sauvegarder un panier vide dans le localStorage
      localStorage.setItem('cart', JSON.stringify([]));
      
      return {
        ...state,
        cartItems: [],
      };

    case 'INCREMENT_QUANTITY':
      const incrementedCart = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      // Sauvegarder le panier avec la quantité mise à jour dans le localStorage
      localStorage.setItem('cart', JSON.stringify(incrementedCart));

      return {
        ...state,
        cartItems: incrementedCart,
      };

    case 'DECREMENT_QUANTITY':
      const decrementedCart = state.cartItems.map(item =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      
      // Sauvegarder le panier avec la quantité mise à jour dans le localStorage
      localStorage.setItem('cart', JSON.stringify(decrementedCart));

      return {
        ...state,
        cartItems: decrementedCart,
      };

    default:
      return state;
  }
};

export default cartReducer;
