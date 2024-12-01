import React, { useEffect, useState } from 'react';
import CardGrid from '../components/CardGrid'; // Assurez-vous que le chemin est correct
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Myproduct = () => {
  const [products, setProducts] = useState([]);
  const userId=useSelector((state)=>state.auth.user?.ID);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/user/${userId}`);
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
  }, [userId]);

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
      <div className="bg-white">
        <Header />
        <div className="row">
          <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
            <Sidebar />
          </div>
          <div className="col-xl-10">
            <h2>Mes produits</h2>
            {products.length === 0 ? (
              <p>Aucun produit trouvé.</p>
            ) : (
              <CardGrid products={products} isMyProductsPage={true} handleDelete={handleDelete} />

            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
export default Myproduct;
