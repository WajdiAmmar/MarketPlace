import React, { useEffect, useState } from 'react';
import '../../Styles/card.css';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';

function Smartwatches() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/product/Smartwatch');
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
    <div className='bg-light'>
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-xl-10">
          <Container>
            <h2 className="text-center my-4">Smartwatches</h2>
            <div className="product-row">
              {products.map(product => (
                <div key={product.id} className="product-card">
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
              ))}
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Smartwatches;
