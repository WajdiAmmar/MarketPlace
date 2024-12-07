import React, { useEffect, useState } from 'react';
import '../../Styles/card.css';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import CardGrid from '../../components/CardGrid';
function Tablettes() {
      // État pour stocker les produits récupérés depuis l'API
const [products, setProducts] = useState([]);
// État pour gérer la plage de prix sélectionnée pour le filtrage
const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/product/Tablette');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
// Filtrage des produits en fonction de plage de prix
const filteredProducts = products.filter(product => {
  const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée

  return isInPriceRange; // Retourne vrai si tous les critères sont respectés
});
  return (
    <div className='bg-light'>
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar">
        <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
          />
        </div>
        <div className="col-xl-10">
          <Container>
            <h2 className="text-center my-4">Tablettes</h2>
            <CardGrid products={filteredProducts} />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tablettes;
