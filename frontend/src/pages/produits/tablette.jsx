import React, { useEffect, useState } from 'react';

function Tablettes() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/product/Tablette');
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
      <h1>Tablettes</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tablettes;
