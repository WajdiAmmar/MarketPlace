// Pages/HighTechCarousel.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CardGrid from '../../components/CardGrid'; // Importer CardGrid
import { useNavigate } from 'react-router-dom';



const highTechItems = [
  { title: '', image: '/lap1.jpg' },
  { title: '', image: '/ht.png' },
  { title: '', image: '/lap2.jpg' },
  { title: '', image: '/sw1.png' }
];

const highTechCategories = [
  { title: 'Ordinateurs', image: '/ordinateur.jpg' },
  { title: 'Smartphones', image: '/smartphone.jpg' },
  { title: 'Tablettes', image: '/tablette.jpg' },
  { title: 'Smartwatches', image: '/smartwatch.jpg' }
];

function HighTech() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
// État pour gérer la plage de prix sélectionnée pour le filtrage
const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/category/High-Tech');
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

  const handleCategoryClick = (category) => {
    switch (category) {
      case 'Smartphones':
        navigate('/smartphone');
        break;
      case 'Ordinateurs':
        navigate('/ordinateur');
        break;
      case 'Smartwatches':
        navigate('/smartwatch');
        break;
      case 'Tablettes':
        navigate('/tablette');
        break;
      default:
        break;
    }
  };
  // Filtrage des produits en fonction de plage de prix
  const filteredProducts = products.filter(product => {
    const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée
  
    return isInPriceRange; // Retourne vrai si tous les critères sont respectés
  });
  return (
    <div className="bg-light">
      <Header />
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
        <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
          />        </div>
        <div className="col-xl-10">
          <Container>
            {/* Carousel */}
            <h2 className="text-center my-4">High-Tech</h2>
            <Carousel>
              {highTechItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                        style={{
                          height: '400px',
                          transform: 'scale(1.6)',
                          objectFit: 'contain',
                          transition: 'transform 0.3s'
                        }}
                      />
                      <h5 className="mt-3">{item.title}</h5>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Circular Images Below the Carousel */}
            <h3 className="text-center my-4">Explorez plus de catégories de haute technologie</h3>
            <Row className="justify-content-center">
              {highTechCategories.map((category, index) => (
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
                    onClick={() => handleCategoryClick(category.title)}
                  />
                  <h6 className="mt-2">{category.title}</h6>
                </Col>
              ))}
            </Row>

            <h3 className="text-center my-4">Tous les produits High-Tech</h3>
            <CardGrid products={filteredProducts} />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HighTech;
