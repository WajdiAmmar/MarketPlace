import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si tu veux commencer à mesurer la performance de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
reportWebVitals();
