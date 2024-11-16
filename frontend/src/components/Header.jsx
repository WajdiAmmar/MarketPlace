import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Import de useDispatch et useSelector
import { logout } from '../actions/authActions'; // Import de l'action logout

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Déclare le dispatch
  const cartItems = useSelector((state) => state.cart.cartItems); // Cart items depuis Redux
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calcule la quantité totale
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Catégorie active
  const [activeLink, setActiveLink] = useState(""); // Lien actif

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérifier si l'utilisateur est connecté

  const handlePanierClick = () => {
    navigate("/panier");
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      dispatch(logout()); // Déclenche l'action logout si l'utilisateur est connecté
      navigate("/"); // Redirige vers la page d'accueil après la déconnexion
    } else {
      navigate("/login"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
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
              <Col md={3}>
                <h6
                  onClick={handleSmartphoneClick}
                  onMouseEnter={() => handleCategoryMouseEnter("smartphone")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Smartphone <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleOrdinateurClick}
                  onMouseEnter={() => handleCategoryMouseEnter("ordinateur")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Ordinateur <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleSmartwatchClick}
                  onMouseEnter={() => handleCategoryMouseEnter("smartwatch")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Smartwatch <i className="fa-solid fa-angle-right"></i>
                </h6>
              </Col>
              <Col md={3}>
                <h6
                  onClick={handleTabletteClick}
                  onMouseEnter={() => handleCategoryMouseEnter("tablette")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Tablette <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleElectroClick}
                  onMouseEnter={() => handleCategoryMouseEnter("electro")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Électroménager <i className="fa-solid fa-angle-right"></i>
                </h6>
              </Col>
              <Col md={3}>
                <h6
                  onClick={handleMeubleClick}
                  onMouseEnter={() => handleCategoryMouseEnter("meuble")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Meubles <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleFournituresClick}
                  onMouseEnter={() => handleCategoryMouseEnter("fourniture")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Fournitures de bureau <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleParfumClick}
                  onMouseEnter={() => handleCategoryMouseEnter("parfum")}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  Parfumerie <i className="fa-solid fa-angle-right"></i>
                </h6>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Header;
