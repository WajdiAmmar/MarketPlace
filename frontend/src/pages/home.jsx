import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoriesGrid from '../components/CategoriesGrid';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import CarouselComponent from '../components/CarouselComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart(); // Destructure addToCart from useCart
  const navigate = useNavigate(); // Hook pour la navigation

  // Vérification du token JWT dans le localStorage
  const isAuthenticated = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/products');
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des produits: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1];
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesSearchTerm = 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      (product.keywords && product.keywords.some(keyword =>
        keyword.toLowerCase().includes(searchLower))
      );

    return matchesSearchTerm && isInPriceRange && matchesCategory;
  });

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      addToCart(product); // Ajouter au panier si l'utilisateur est connecté
    } else {
      // Rediriger vers la page de login si l'utilisateur n'est pas connecté
      Swal.fire({
        icon: 'warning',
        title: 'Non connecté',
        text: 'Vous devez vous connecter pour ajouter un produit au panier.',
      }).then(() => {
        navigate('/login'); // Redirection vers la page de login
      });
    }
  };

  return (
    <div className="App bg-light">
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          <Sidebar 
            onPriceChange={setSelectedPriceRange} 
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="col-xl-10 main-content">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CarouselComponent />
          <div style={{ marginTop: '30px' }} />
          <CategoriesGrid />
          
          <Container>
            <h2 className="text-center my-4">Tous les Produits</h2>
            <Row>
              {filteredProducts.map(product => (
                <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
                  <div className="product-card">
                    <div className="product-image-container">
                      <img src={product.imageUrl} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                      <h2 className="product-title">{product.title}</h2>
                      <p className="product-price">{product.price} DT</p>
                      <p className="product-description">{product.description}</p>
                      <button
                        className="buy-now-button"
                        onClick={() => handleAddToCart(product)} // Ajout au panier avec vérification
                      >
                        Ajouter au panier
                      </button>
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
