import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';  // Importer Provider de react-redux
import store from './store/store';  // Importer le store que tu as créé

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Envelopper l'application avec Provider et passer le store */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Si tu veux commencer à mesurer la performance de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
reportWebVitals();
