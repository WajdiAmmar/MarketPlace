import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Row, Col } from "react-bootstrap";
import "../Styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import de useDispatch et useSelector
import { logout } from "../actions/authActions"; // Import de l'action logout
import Swal from "sweetalert2"; // Importer SweetAlert2

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Déclare le dispatch
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // Catégorie active
  const [activeLink, setActiveLink] = useState(""); // Lien actif
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérifier si l'utilisateur est connecté
  const userId = useSelector((state) => state.auth.user?.ID);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError("Vous devez être connecté pour accéder au panier.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/cart/cart/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.data.products || []);
        } else {
          setError(data.message || "Erreur lors du chargement du panier.");
        }
      } catch (err) {
        setError("Erreur réseau ou serveur.");
      }
    };

    fetchCart();
  }, [userId]);
  const handleLoginClick = () => {
    if (isAuthenticated) {
      dispatch(logout()); // Déclenche l'action logout si l'utilisateur est connecté
      navigate("/"); // Redirige vers la page d'accueil après la déconnexion
    } else {
      navigate("/login"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  };

  // Fonction générique de gestion de navigation
  const handleNavigation = (targetPath) => {
    if (isAuthenticated) {
      navigate(targetPath);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Connectez-vous",
        text: "Vous devez être connecté pour accéder à cette page.",
        confirmButtonText: "Se connecter",
        showCancelButton: true,
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Rediriger vers la page de login
        }
      });
    }
  };
  const handlePanierClick = () => handleNavigation("/panier");
  const handleMyproductClick = () => handleNavigation("/mesproduits");
  const handleHighTechClick = () => handleNavigation("/high-tech");
  const handleMaisonClick = () => handleNavigation("/cuisine-maison");
  const handleBeauteClick = () => handleNavigation("/beaute");
  const handleSmartphoneClick = () => handleNavigation("/smartphone");
  const handleOrdinateurClick = () => handleNavigation("/ordinateur");
  const handleSmartwatchClick = () => handleNavigation("/smartwatch");
  const handleTabletteClick = () => handleNavigation("/tablette");
  const handleElectroClick = () => handleNavigation("/electro");
  const handleMeubleClick = () => handleNavigation("/meuble");
  const handleFournituresClick = () => handleNavigation("/fourniture");
  const handleParfumClick = () => handleNavigation("/parfum");
  const handleMaquillageClick = () => handleNavigation("/maquillage");
  const handleSoinsClick = () => handleNavigation("/soins");
  const handleCoiffureClick = () => handleNavigation("/coiffure");

  const handleMouseEnter = () => {
    setShowCategories(true); // Affiche le menu au survol
  };

  const handleMouseLeave = () => {
    setShowCategories(false); // Masque le menu si la souris quitte
  };

  const handleCategoryMouseEnter = (category) => {
    setActiveCategory(category); // Définit la catégorie active au survol
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
              <div style={{ position: "relative" }}>
                {/* Affichage conditionnel du compteur */}
                {cartItems.some((item) => item.quantity > 0) && (
                  <span
                    className="cart-count"
                    style={{
                      position: "absolute",
                      background: "black",
                      color: "#F9A825",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      fontSize: "11px",
                      marginLeft: "90px",
                      marginTop: "20px",
                    }}
                  >
                    {/* Somme des quantités des articles */}
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}

                <Button
                  variant="outlined"
                  id="panier-btn"
                  onClick={handlePanierClick}
                >
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
                href="/"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`nav-link ${
                  activeLink === "#Catégories" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("#Catégories")}
              >
                Catégories <i className="fa-solid fa-angle-down"></i>
              </Nav.Link>
              <Nav.Link onClick={handleMyproductClick}>Mes produits</Nav.Link>
              <Nav.Link
                href="/"
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
        <div
          className="categories-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Container>
            <Row>
              <Col md={3}>
                <h6
                  onClick={handleHighTechClick}
                  onMouseEnter={() => handleCategoryMouseEnter("highTech")}
                >
                  High-Tech <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleMaisonClick}
                  onMouseEnter={() => handleCategoryMouseEnter("maisonCuisine")}
                >
                  Cuisine et Maison <i className="fa-solid fa-angle-right"></i>
                </h6>
                <h6
                  onClick={handleBeauteClick}
                  onMouseEnter={() => handleCategoryMouseEnter("beaute")}
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
                      <p onClick={handleFournituresClick}>
                        Fournitures de Cuisines
                      </p>
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
