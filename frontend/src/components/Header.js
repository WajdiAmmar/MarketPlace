import React from 'react';  
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap'; 
import '../Styles/Header.css'; // Import du fichier CSS 
import { useNavigate } from 'react-router-dom'; 

function Header() {   
  const navigate = useNavigate(); // Utiliser le hook useNavigate   

  const handleLoginClick = () => {     
    navigate('/login'); // Rediriger vers la page de connexion   
  };   

  return (     
    <div>       
      {/* Partie supérieure du header */}       
      <div className="top-bar">         
        <Container>           
          <Row className="align-items-center">             
            <Col md={2} className="logo">                
              <img src="/logo.png" alt="Logo" className="logo-img" />             
            </Col>             
            <Col md={8}>   
              <h1 className="header-title">     
                <i>HAPPY</i>     
                <b style={{ color: '#F9A825' }}>shop</b>     
                <img        
                  src="/emoji.jpg"        
                  alt="Logo"        
                  style={{ width: '60px', height: '60px', marginLeft: '40px' }}     
                />   
              </h1> 
            </Col> 
            <Col>   
              <Button variant="outlined" id="panier-btn">
                <img src="/panier.png" alt="Logo" />     
                Panier   
              </Button> 
            </Col> 
          </Row>  
        </Container>       
      </div>        

      {/* Barre de navigation */}       
      <Navbar expand="lg" className="text-light">         
        <Container>           
          <Navbar.Toggle aria-controls="navbar-nav" />           
          <Navbar.Collapse id="navbar-nav">             

            {/* Décalage du nav à droite avec ms-auto */}
            <Nav className="ms-auto">               
              <Nav.Link href="#home">Home</Nav.Link>               
              <Nav.Link href="#Catégories">Catégories</Nav.Link>               
              <Nav.Link href="#Offres et Promotions">Offres et Promotions</Nav.Link>               
              <Nav.Link href="#Vendre un Produit">Vendre un Produit</Nav.Link>                       
              <Nav.Link href="#contact">Contact</Nav.Link>             
            </Nav>             

            <Button 
              variant="outline-light" 
              id="connecter-btn" 
              onClick={handleLoginClick}
              className="ms-6"  // Espacement entre le bouton et le nav
            >
              Se connecter
            </Button>           

          </Navbar.Collapse>         
        </Container>       
      </Navbar>     
    </div>   
  ); 
};  

export default Header;
