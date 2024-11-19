import {React,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optionnel si vous avez des styles personnalisés
import RouteList from './route/routeliste';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { login} from './actions/authActions';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
  if (token && user) {
    dispatch(login(token, user));
    }
  }, [dispatch]);
  return (
    <Router>
    <div className="App">
      <RouteList />
    </div>
    </Router>

  );
}
export default App;
