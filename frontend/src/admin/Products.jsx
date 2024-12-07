import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardGrid from '../components/CardGrid';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
const Products = () => {

    const [products, setProducts] = useState([]);
  
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/products');
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
    const handleDelete = async (productId) => {
        try {
          const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/products/${productId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit');
          }
      
          // Supprimer le produit de l'état local après la suppression réussie
          setProducts(products.filter(product => product.id !== productId));
          Swal.fire({
            icon: 'success',
            title: 'Produit supprimé',
            text: 'Le produit a été supprimé avec succès.',
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du produit.',
          });
        }
      };
      return (
        <div className="App bg-light">
          <Header />
          <div className="row">
            <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
              <Sidebar/>
            </div>
            <div className="col-xl-10 main-content">
              <Container>
                <h2 className="text-center my-4">Tous les Produits</h2>
                <CardGrid products={products} isMyProductsPage={true} handleDelete={handleDelete} /> 
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      );
}


export default Products;