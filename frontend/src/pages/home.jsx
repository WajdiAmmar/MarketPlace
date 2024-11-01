import React, { useEffect, useState } from 'react';
import Header from '../components/Header';  // Importer le Header
import MainBanner from '../components/MainBanner';  // Importer le MainBanner
import CategoriesGrid from '../components/CategoriesGrid';  // Importer la grille des catégories
import Footer from '../components/Footer';  // Importer le Footer
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import CarouselComponent from '../components/CarouselComponent';
import { Container, Row, Col } from 'react-bootstrap';  // Importer les composants de Bootstrap

const Home = () => {
  const [products, setProducts] = useState([]); // État pour stocker les produits

  // Fonction pour récupérer tous les produits
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/products'); // Assurez-vous que le chemin est correct
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      const data = await response.json(); // Convertir la réponse en JSON
      setProducts(data); // Mettre à jour l'état avec les produits récupérés
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  // Utiliser useEffect pour récupérer les produits au chargement du composant

    fetchProducts();
  }, []); // Le tableau vide signifie que cela ne s'exécute qu'au chargement initial

  return (
    <div className="App bg-light">
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          <Sidebar />
        </div>
        <div className="col-xl-10 main-content"> 
          <SearchBar />
          <CarouselComponent />
          <div style={{ marginTop: '30px' }} />
          <CategoriesGrid />
          
          {/* Affichage des produits */}
          <Container>
            <h2 className="text-center my-4">Tous les Produits</h2>
            <Row>
              {products.map(product => (
                <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
                  <div className="product-card">
                    <div className="product-image-container">
                      <img src={product.imageUrl} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">{product.title}</h2>
                      <p className="product-price">{product.price} DT</p>
                      <p className="product-description">{product.description}</p>
                      <button className="buy-now-button">Ajouter au panier</button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
