import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import CardGrid from '../../components/CardGrid';
// Produits de Beauté
const beautyItems = [
  { title: '', image: '/creme1.jpg' },
  { title: '', image: '/makeup.jpg' },
  { title: '', image: '/parfum.jpg' },
  { title: '', image: '/haircare1.jpg' }
];

// Catégories de Beauté
const beautyCategories = [
  { title: 'Soins de la peau', image: '/soin.jpg' },
  { title: 'Maquillage', image: '/makeup.jpg' },
  { title: 'Parfums', image: '/Parfum-.png' },
  { title: 'Coiffure', image: '/coiffure.jpg' }
];


function Beauty() {
  const navigate = useNavigate();
  // État pour stocker les produits récupérés depuis l'API
const [products, setProducts] = useState([]);
// État pour gérer la plage de prix sélectionnée pour le filtrage
const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/category/Beauté');
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
  const handleParfumClick = () => {
    navigate('/parfum');
  };
  const handleMaquillageClick = () => {
    navigate('/maquillage');
  };
  const handleSoinsClick = () => {
    navigate('/soins');
  };
  const handleCoiffureClick = () => {
    navigate('/coiffure');
  };

  // Filtrage des produits en fonction de plage de prix
const filteredProducts = products.filter(product => {
  const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée

  return isInPriceRange; // Retourne vrai si tous les critères sont respectés
});
  return (
    <div className='bg-light'>
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
        <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
          />
        </div>
        <div className="col-xl-10">
          <Container>
            {/* Carousel */}
            <h2 className="text-center my-4">Beauté</h2>
            <Carousel>
              {beautyItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                        style={{
                          height: '300px',
                          transform: 'scale(1.6)',
                          objectFit: 'contain',
                          transition: 'transform 0.3s',
                        }}
                      />
                      <h5 className="mt-3">{item.title}</h5>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Images circulaires des catégories */}
            <h3 className="text-center my-4">Explorez plus de catégories de beauté</h3>
            <Row className="justify-content-center">
              {beautyCategories.map((category, index) => (
                <Col md={3} sm={6} xs={12} key={index} className="text-center mb-4">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="img-fluid rounded-circle"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                    onClick={
                      category.title === 'Parfums'
                        ? handleParfumClick :
                        category.title === 'Maquillage'
                        ? handleMaquillageClick :
                        category.title === 'Soins de la peau'
                        ? handleSoinsClick: 
                        category.title === 'Coiffure'
                        ? handleCoiffureClick 
                        : null
                      }
                  />
                  <h6 className="mt-2"onClick={
                      category.title === 'Parfums'
                        ? handleParfumClick :
                        category.title === 'Maquillage'
                        ? handleMaquillageClick :
                        category.title === 'Soins de la peau'
                        ? handleSoinsClick:
                        category.title === 'Coiffure'
                        ? handleCoiffureClick 
                        : null
                      }>{category.title}</h6>
                </Col>
              ))}
            </Row>
            <h3 className="text-center my-4">Tous les produits Beauté</h3>
            <CardGrid products={filteredProducts} />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Beauty;
