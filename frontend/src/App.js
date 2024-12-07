// Importation des dépendances nécessaires
import React from 'react'; // Importation de React pour la création des composants
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles Bootstrap pour la mise en forme
import './App.css'; // Importation des styles personnalisés pour l'application (si présents)
import RouteList from './route/routeliste'; // Importation de la liste des routes pour la gestion de la navigation
import { BrowserRouter as Router } from 'react-router-dom'; // Importation du Router pour gérer la navigation des routes dans l'application
import { PersistGate } from 'redux-persist/integration/react'; // Permet de gérer la persistance de l'état (Redux Persist)
import { Provider } from 'react-redux'; // Permet de connecter le store Redux à l'application
import { store, persistor } from './store/store'; // Importation du store et du persistor de Redux

function App() {
  return (
    // Le Provider connecte l'application au store Redux
    <Provider store={store}>
      {/* PersistGate attend que le store persistant soit rétabli avant de rendre l'application */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Router permet la gestion des routes dans l'application */}
        <Router>
          <div className="App">
            {/* RouteList contient la logique pour rendre les différentes pages/routes de l'application */}
            <RouteList />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App; // Exportation du composant App
