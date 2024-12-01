import React, { useEffect, useState } from 'react';
import '../../Styles/card.css';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Container} from 'react-bootstrap';
import CardGrid from '../../components/CardGrid';

function  Coiffure() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/product/Coiffure');
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
            <h2 className="text-center my-4">Coiffure</h2>
            <CardGrid products={products} />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Coiffure;
