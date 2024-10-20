import React, { useState } from 'react';   
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap'; 
import '../Styles/Header.css'; 
import { useNavigate } from 'react-router-dom'; 

function Header() {   
  const navigate = useNavigate(); 
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // État pour la catégorie active
  const [activeLink, setActiveLink] = useState(''); // État pour le lien actif

  const handleLoginClick = () => {     
    navigate('/login'); 
  };  

  const handleMouseEnter = () => {
    setShowCategories(true); // Affiche le menu au survol
  };

  const handleMouseLeave = () => {
    setShowCategories(false); // À utiliser uniquement si la souris quitte le menu
  };

  const handleCategoryMouseEnter = (category) => {
    setActiveCategory(category); // Définit la catégorie active au survol
  };

  const handleCategoryMouseLeave = () => {
    // Vous pouvez choisir de garder activeCategory comme est ou le réinitialiser
    // setActiveCategory(null); // Si vous voulez désactiver la catégorie en quittant
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Définit le lien actif
    navigate(link); // Navigue vers le lien
  };

  return (     
    <div>       
      <div className="top-bar mt-10">         
        <Container>           
          <Row className="align-items-center">             
            <Col md={1} className="logo">                
              <img src="/logo.png" alt="Logo" className="logo-img" />             
            </Col>             
            <Col md={8}>   
              <h1 className="header-title">     
                <i>HAPPY</i>     
                <b style={{ color: '#F9A825' }}>shop</b>     
                <img src="/emoji.jpg" alt="Logo" style={{ width: '60px', height: '60px', marginLeft: '40px' }} />   
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
      <Navbar expand="lg" className="text-light mt-15">         
        <Container>           
          <Navbar.Toggle aria-controls="navbar-nav" />           
          <Navbar.Collapse id="navbar-nav">             
            <Nav className="ms-auto">               
              <Nav.Link 
                href="#home" 
                className={`nav-link ${activeLink === '#home' ? 'active' : ''}`} 
                onClick={() => handleLinkClick('#home')}
              >
                Home
              </Nav.Link>               

              <Nav.Link 
                href="#Catégories" 
                onMouseEnter={handleMouseEnter}
                className={`nav-link ${activeLink === '#Catégories' ? 'active' : ''}`} 
                onClick={() => handleLinkClick('#Catégories')}
              >
                Catégories <i className="fa-solid fa-angle-down"></i>
              </Nav.Link>               

              <Nav.Link 
                href="#Offres et Promotions" 
                className={`nav-link ${activeLink === '#Offres et Promotions' ? 'active' : ''}`} 
                onClick={() => handleLinkClick('#Offres et Promotions')}
              >
                Offres et Promotions
              </Nav.Link>               

              <Nav.Link 
                href="#Vendre un Produit" 
                className={`nav-link ${activeLink === '#Vendre un Produit' ? 'active' : ''}`} 
                onClick={() => handleLinkClick('#Vendre un Produit')}
              >
                Vendre un Produit
              </Nav.Link>                       

              <Nav.Link 
                href="#contact" 
                className={`nav-link ${activeLink === '#contact' ? 'active' : ''}`} 
                onClick={() => handleLinkClick('#contact')}
              >
                Contact
              </Nav.Link>             
            </Nav>             

            <Button 
              variant="outline-light" 
              id="connecter-btn" 
              onClick={handleLoginClick}
              className="ms-6"
            >
              Se connecter
            </Button>           
          </Navbar.Collapse>         
        </Container>       
      </Navbar>     

      {/* Menu des catégories affiché au survol */} 
      {showCategories && (
        <div 
          className="categories-menu" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Container>
            <Row>
              <Col md={3}>
                <h6 
                  onMouseEnter={() => handleCategoryMouseEnter('highTech')}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  High-Tech <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6 
                  onMouseEnter={() => handleCategoryMouseEnter('maisonCuisine')}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  Cuisine et Maison <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6 
                  onMouseEnter={() => handleCategoryMouseEnter('beaute')}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  Beauté <i className="fa-solid fa-angle-right"></i>
                </h6>
              </Col>
              <Col md={3}>
                {activeCategory === 'highTech' && (
                  <ul>
                    <img src="/ordinateur.webp" alt="ordinateur" className="category-img" />
                    <li>Ordinateurs</li>
                    <img src="/phone.png" alt="phone" className="category-img" />
                    <li>Téléphones</li>
                  </ul>
                )}
                {activeCategory === 'maisonCuisine' && (
                  <ul>
                    <img src="/meuble.png" alt="meuble" className="category-img" />
                    <li>Meubles</li>
                    <img src="/electromenager.png" alt="electromenager" className="category-img" />
                    <li>Electroménager</li>
                  </ul>
                )}
                {activeCategory === 'beaute' && (
                  <ul>
                    <img src="/beaute.jpg" alt="Beauté" className="category-img" />
                    <li>Maquillage</li>
                    <img src="/cremes.png" alt="Crèmes" className="category-img" />
                    <li>Crèmes</li>
                  </ul>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>   
  ); 
};  

export default Header;   
