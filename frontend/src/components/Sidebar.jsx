import { Button,} from 'react-bootstrap';
import '../Styles/sidebar.css';
import { Link , useNavigate } from 'react-router-dom'; 
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {     
    navigate('/ajoutProduit'); 
  };  
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
   <div className="col">
    <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
          <ul className="list">
          <li className="list-group-item">
              <Link to="#">{('Tableaudebord')}</Link>
            </li>
            <li className="list-group-item">
              <Link to="#">{('Gatégories')}</Link>
            </li>
            <li className="list-group-item">
              <Link to="#">{('Produit')}</Link>
            </li>
          </ul>
          <Button variant="outline-light" id="connecter-btn" onClick={handleLoginClick}>Ajouter Votre Produit</Button>
        </div>
  );
};

export default Sidebar;
