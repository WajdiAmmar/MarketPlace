import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optionnel si vous avez des styles personnalisés
import RouteList from './route/routeliste';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'; 

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <RouteList />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
