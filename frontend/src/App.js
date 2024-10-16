import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optionnel si vous avez des styles personnalisés
import RouteList from './route/routeliste';
import { BrowserRouter as Router } from 'react-router-dom'; 

function App() {
  return (
    <Router>
    <div className="App">
      <RouteList />
    </div>
    </Router>

  );
}
export default App;
