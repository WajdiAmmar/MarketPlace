import React, { useState,useEffect } from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext'; // Importer le contexte du panier

function Header() {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Récupérer les items du panier
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculer la quantité totale
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // État pour la catégorie active
  const [activeLink, setActiveLink] = useState(""); // État pour le lien actif

  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour vérifier la connexion de l'utilisateur

  // Vérification de l'état de l'utilisateur à chaque chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Vérifier la présence du token dans localStorage
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est connecté
    } else {
      setIsAuthenticated(false); // L'utilisateur n'est pas connecté
    }
  }, []);

  const handlePanierClick = () => {
    navigate("/panier");
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsAuthenticated(false); 
    navigate("/"); 
  };

  const handleHighTechClick = () => {
    navigate("/high-tech");
  };
  const handleMaisonClick = () => {
    navigate("/cuisine-maison");
  };
  const handleBeauteClick = () => {
    navigate("/beaute");
  };
  const handleSmartphoneClick = () => {
    navigate('/smartphone');
  };
  const handleOrdinateurClick = () => {
    navigate('/ordinateur');
  };
  const handleSmartwatchClick = () => {
    navigate('/smartwatch');
  };
  const handleTabletteClick = () => {
    navigate('/tablette');
  };
  const handleElectroClick = () => {
    navigate('/electro');
  };
  const handleMeubleClick = () => {
    navigate('/meuble');
  };
  const handleFournituresClick = () => {
    navigate('/fourniture');
  };
  const handleParfumClick = () => {
    navigate('/parfum');
  };
  const handleMaquillageClick = () => {
    navigate('/maquillage');
  };
  const handleSoinsClick = () => {
    navigate('/soins');
  };
  const handleCoiffureClick = () => {
    navigate('/coiffure');
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
                <b style={{ color: "#F9A825" }}>shop</b>
                <img
                  src="/emoji.jpg"
                  alt="Logo"
                  style={{ width: "60px", height: "60px", marginLeft: "40px" }}
                />
              </h1>
            </Col>
            <Col>
              <div style={{ position: 'relative' }}>
                {/* Compteur de produits dans le panier */}
                {totalQuantity > 0 && (
                  <span className="cart-count" style={{
                    position: 'absolute',
                    Left: '-20px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '5px 10px',
                    fontSize: '9px',
                    marginLeft:'90px',
                    marginTop:'20px'
                  }}>
                    {totalQuantity}
                  </span>
                )}
                <Button variant="outlined" id="panier-btn" onClick={handlePanierClick}>
                  <img src="/panier.png" alt="Logo" />
                  Panier
                </Button>
              </div>
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
                href="/"
                className={`nav-link ${activeLink === "#home" ? "active" : ""}`}
                onClick={() => handleLinkClick("#home")}
              >
                Home
              </Nav.Link>

              <Nav.Link
                href="#Catégories"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`nav-link ${
                  activeLink === "#Catégories" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("#Catégories")}
              >
                Catégories <i className="fa-solid fa-angle-down"></i>
              </Nav.Link>

              <Nav.Link
                href="#Offres et Promotions"
                className={`nav-link ${
                  activeLink === "#Offres et Promotions" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("#Offres et Promotions")}
              >
                Offres et Promotions
              </Nav.Link>

              <Nav.Link
                href="#Vendre un Produit"
                className={`nav-link ${
                  activeLink === "#Vendre un Produit" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("#Vendre un Produit")}
              >
                Vendre un Produit
              </Nav.Link>

              <Nav.Link
                href="#contact"
                className={`nav-link ${
                  activeLink === "#contact" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("#contact")}
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
              {isAuthenticated ? "Se déconnecter" : "Se connecter"}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Menu des catégories affiché au survol */}
      {showCategories && (
        <div className="categories-menu" onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          <Container>
            <Row>
              <Col md={3}>
                <h6
                  onClick={handleHighTechClick}
                  onMouseEnter={() => handleCategoryMouseEnter("highTech")}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  High-Tech <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleMaisonClick}
                  onMouseEnter={() => handleCategoryMouseEnter("maisonCuisine")}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  Cuisine et Maison <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleBeauteClick}
                  onMouseEnter={() => handleCategoryMouseEnter("beaute")}
                  onMouseLeave={handleCategoryMouseLeave} // Gardez ici si vous voulez désactiver
                >
                  Beauté <i className="fa-solid fa-angle-right"></i>
                </h6>
              </Col>
              <Col md={8}>
                {activeCategory === "highTech" && (
                  <Row>
                    <Col>
                      <img
                        src="/ordinateur.jpg"
                        alt="ordinateur"
                        className="category-img"
                        onClick={handleOrdinateurClick}
                      />
                      <p onClick={handleOrdinateurClick}>Ordinateurs</p>
                    </Col>
                    <Col>
                      <img
                        src="/smartphone.jpg"
                        alt="phone"
                        className="category-img"
                        onClick={ handleSmartphoneClick }
                      />
                      <p onClick={ handleSmartphoneClick }>Smartphones</p>
                    </Col>
                    <Col>
                      <img
                        src="/tablette.jpg"
                        alt="smartwatches"
                        className="category-img"
                        onClick={handleTabletteClick}
                      />
                      <p onClick={handleTabletteClick}>Tablettes</p>
                    </Col>
                    <Col>
                      <img
                        src="/smartwatch.jpg"
                        alt="smartwatches"
                        className="category-img"
                        onClick={handleSmartwatchClick}
                      />
                      <p onClick={handleSmartwatchClick}>Smartwatches</p>
                    </Col>
                  </Row>
                )}
                {activeCategory === "maisonCuisine" && (
                  <Row>
                    <Col>
                      <img
                        src="/meuble.png"
                        alt="meuble"
                        className="category-img"
                        onClick={handleMeubleClick}
                      />
                      <p onClick={handleMeubleClick}>Meubles</p>
                    </Col>
                    <Col>
                      <img
                        src="/electromenager.png"
                        alt="electromenager"
                        className="category-img"
                        onClick={handleElectroClick}
                      />
                      <p onClick={handleElectroClick}>Electroménager</p>
                    </Col>
                    <Col>
                      <img
                        src="/fourniturescuisines.png"
                        alt="fourniturescuisines"
                        className="category-img"
                        onClick={handleFournituresClick}
                      />
                      <p onClick={handleFournituresClick} >Fournitures de Cuisines</p>
                    </Col>
                  </Row>
                  
                )}
                {activeCategory === "beaute" && (
                  <Row>
                    <Col>
                      <img
                        src="/soin.jpg"
                        alt="Beauté"
                        className="category-img"
                        onClick={handleSoinsClick}
                      />
                      <p onClick={handleSoinsClick}>Soins de la peau</p>
                    </Col>
                    <Col>
                      <img
                        src="/Makeup.jpg"
                        alt="Beauté"
                        className="category-img"
                        onClick={handleMaquillageClick}
                      />
                      <p onClick={handleMaquillageClick}>Maquillage</p>
                    </Col>
                    <Col>
                      <img
                        src="/Parfum-.png"
                        alt="Crèmes"
                        className="category-img"
                        onClick={handleParfumClick}
                      />
                      <p onClick={handleParfumClick}>Parfums</p>
                    </Col>
                    <Col>
                      <img
                        src="/coiffure.jpg"
                        alt="outilsbeaute"
                        className="category-img"
                        onClick={handleCoiffureClick}
                      />
                      <p onClick={handleCoiffureClick}>Coiffure</p>
                    </Col>
                    
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Header;