// components/Home.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Composant pour l'en-tête
import CategoriesGrid from '../components/CategoriesGrid'; // Composant pour afficher les catégories
import Footer from '../components/Footer'; // Composant pour le pied de page
import SearchBar from '../components/SearchBar'; // Barre de recherche pour les produits
import Sidebar from '../components/Sidebar'; // Barre latérale pour les filtres
import CarouselComponent from '../components/CarouselComponent'; // Composant pour un carrousel d'images
import { Container } from 'react-bootstrap'; // Conteneur Bootstrap pour la mise en page
import CardGrid from '../components/CardGrid'; // Composant pour afficher une grille de cartes de produits

const Home = () => {
  // État pour stocker les produits récupérés depuis l'API
  const [products, setProducts] = useState([]);
  
  // État pour gérer le terme de recherche entré par l'utilisateur
  const [searchTerm, setSearchTerm] = useState('');
  
  // État pour gérer la plage de prix sélectionnée pour le filtrage
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);
  
  // État pour gérer la catégorie sélectionnée pour le filtrage
  const [selectedCategory, setSelectedCategory] = useState('');

  // Effet pour récupérer les produits depuis l'API au montage du composant
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/products'); // Requête API pour les produits
        if (!response.ok) {
          // Gestion des erreurs si la requête échoue
          throw new Error(`Erreur lors de la récupération des produits: ${response.statusText}`);
        }
        const data = await response.json(); // Conversion des données en JSON
        setProducts(data); // Mise à jour de l'état avec les produits récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error.message); // Affiche une erreur si la requête échoue
      }
    };

    fetchProducts(); // Appelle la fonction pour récupérer les produits
  }, []);

  // Filtrage des produits en fonction des critères de recherche, de catégorie et de plage de prix
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase(); // Convertit le terme de recherche en minuscules pour la correspondance
    const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory; // Vérifie si le produit correspond à la catégorie sélectionnée
    const matchesSearchTerm = 
      product.title.toLowerCase().includes(searchLower) || // Recherche dans le titre du produit
      product.description.toLowerCase().includes(searchLower) || // Recherche dans la description
      (product.keywords && product.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower)) // Recherche dans les mots-clés
      );

    return matchesSearchTerm && isInPriceRange && matchesCategory; // Retourne vrai si tous les critères sont respectés
  });

  return (
    <div className="App bg-light"> {/* Conteneur principal */}
      <Header /> {/* En-tête */}
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          {/* Barre latérale pour les filtres */}
          <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
            onCategoryChange={setSelectedCategory} // Gestion du changement de catégorie
          />
        </div>
        <div className="col-xl-10 main-content">
          <SearchBar 
            searchTerm={searchTerm} // Valeur actuelle de la recherche
            onSearchChange={setSearchTerm} // Mise à jour du terme de recherche
          />
          <CarouselComponent /> {/* Carrousel d'images */}
          <div style={{ marginTop: '30px' }} />
          <CategoriesGrid /> {/* Grille des catégories */}
          
          <Container>
            <h2 className="text-center my-4">Tous les Produits</h2>
            {/* Grille de produits filtrés */}
            <CardGrid 
              products={filteredProducts} // Produits filtrés à afficher
            /> 
          </Container>
        </div>
      </div>
      <Footer /> {/* Pied de page */}
    </div>
  );
};

export default Home; // Exportation du composant pour utilisation ailleurs
