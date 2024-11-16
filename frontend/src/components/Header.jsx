import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Remplace useCart par useSelector et useDispatch


function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // Remplace useCart par Redux pour récupérer les items du panier
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calcule la quantité totale
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
    setShowCategories(false); // Masque le menu si la souris quitte
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
                    left: '-20px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '5px 10px',
                    fontSize: '9px',
                    marginLeft: '90px',
                    marginTop: '20px'
                  }}>
                    {totalQuantity}
                  </span>
                )}
                <Button variant="outlined" id="panier-btn" onClick={handlePanierClick}>
                  <img src="/panier.png" alt="Panier" />
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
                className={`nav-link ${activeLink === "#Catégories" ? "active" : ""}`}
                onClick={() => handleLinkClick("#Catégories")}
              >
                Catégories <i className="fa-solid fa-angle-down"></i>
              </Nav.Link>
              <Nav.Link
                href="#Offres et Promotions"
                className={`nav-link ${activeLink === "#Offres et Promotions" ? "active" : ""}`}
                onClick={() => handleLinkClick("#Offres et Promotions")}
              >
                Offres et Promotions
              </Nav.Link>
              <Nav.Link
                href="#Vendre un Produit"
                className={`nav-link ${activeLink === "#Vendre un Produit" ? "active" : ""}`}
                onClick={() => handleLinkClick("#Vendre un Produit")}
              >
                Vendre un Produit
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className={`nav-link ${activeLink === "#contact" ? "active" : ""}`}
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
        <div className="categories-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Container>
            <Row>
              <Col md={3}>
                <h6
                  onClick={handleHighTechClick}
                  onMouseEnter={() => handleCategoryMouseEnter("highTech")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  High-Tech <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleMaisonClick}
                  onMouseEnter={() => handleCategoryMouseEnter("maisonCuisine")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Cuisine et Maison <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleBeauteClick}
                  onMouseEnter={() => handleCategoryMouseEnter("beaute")}
                  onMouseLeave={handleCategoryMouseLeave}
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
                        onClick={handleSmartphoneClick}
                      />
                      <p onClick={handleSmartphoneClick}>Smartphones</p>
                    </Col>
                    <Col>
                      <img
                        src="/tablette.jpg"
                        alt="tablette"
                        className="category-img"
                        onClick={handleTabletteClick}
                      />
                      <p onClick={handleTabletteClick}>Tablettes</p>
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
