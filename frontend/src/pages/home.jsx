// components/Home.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoriesGrid from '../components/CategoriesGrid';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import CarouselComponent from '../components/CarouselComponent';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../components/CardGrid';  // Importation du composant CardGrid

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  // Vérification de l'authentification au démarrage de la page
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Vérifie si le token est présent dans localStorage
    if (token) {  // Si un token existe
      dispatch(login(token));  // Déclenche l'action pour connecter l'utilisateur
    }
  }, [dispatch]); // Cette vérification ne se fait qu'une seule fois au démarrage

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

  return (
    <div className="App bg-light">
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          <Sidebar onPriceChange={setSelectedPriceRange} onCategoryChange={setSelectedCategory} />
        </div>
        <div className="col-xl-10 main-content">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CarouselComponent />
          <div style={{ marginTop: '30px' }} />
          <CategoriesGrid />
          
          <Container>
            <h2 className="text-center my-4">Tous les Produits</h2>
            <CardGrid products={filteredProducts} /> {/* Utilisation du CardGrid sans passer handleAddToCart */}
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
