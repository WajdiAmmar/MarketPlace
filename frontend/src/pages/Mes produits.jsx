import React, { useEffect, useState } from 'react';
import CardGrid from '../components/CardGrid'; // Assurez-vous que le chemin est correct

const Myproduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {


    const fetchProducts = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.ID
      try {
        const response = await fetch(`http://localhost:5000/api/products/user/${userId}`);
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

  return (
    <div>
      <h2>Mes produits</h2>
      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <CardGrid products={products} /> // Intégration du composant CardGrid
      )}
    </div>
  );
};

export default Myproduct;
