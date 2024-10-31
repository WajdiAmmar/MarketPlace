import React, { useEffect, useState } from 'react';
import '../../Styles/card.css';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container, Row, Col } from 'react-bootstrap';

function Fournitures() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/product/Fournitures de cuisines');
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
            <h2 className="text-center my-4">Fournitures de cuisines</h2>
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
}

export default Fournitures;
