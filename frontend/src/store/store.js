// Importation des outils nécessaires de Redux et Redux Persist
import { configureStore } from '@reduxjs/toolkit'; // Pour configurer le store Redux
import { persistStore, persistReducer } from 'redux-persist'; // Pour la persistance de l'état
import storage from 'redux-persist/lib/storage'; // Utilisation du localStorage comme mécanisme de stockage
import authReducer from '../reducers/authReducer'; // Le réducteur d'authentification

// Configuration de la persistance de l'état de l'authentification
const authPersistConfig = {
  key: 'auth',    // Clé utilisée pour stocker l'état d'authentification dans le stockage local
  storage,        // Spécifie le mécanisme de stockage (localStorage dans ce cas)
};

// Application de la persistance au réducteur d'authentification
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configuration du store Redux avec le réducteur d'authentification persisté
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Le réducteur d'authentification persistant
  },
});

// Configuration de la persistance du store
const persistor = persistStore(store);

// Exportation du store et du persistor pour utilisation dans l'application
export { store, persistor };
