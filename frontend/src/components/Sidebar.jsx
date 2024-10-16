import { Link } from "react-router-dom";
import { Button,} from 'react-bootstrap';
import '../Styles/sidebar.css'
const Sidebar = () => {
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
          <ul className="list-group">
          <li className="list-group-item">
              <Link to="#">{('tableaudebord')}</Link>
            </li>
            <li className="list-group-item">
              <Link to="../dashboard/ListeComptable">{('listecomptable')}</Link>
            </li>
            <li className="list-group-item">
              <Link to="../dashboard/ListeClients">{('listclient')}</Link>
            </li>
          
          </ul>
        </div>
  );
};

export default Sidebar;
