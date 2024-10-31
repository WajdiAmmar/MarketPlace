import React from 'react';
import { Container, Row, Col,Carousel } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar'

const cuisineMaisonCategories = [
  { title: 'Électroménager', image: '/electromenager.png' },
  { title: 'Meubles', image: '/meuble.png' },
  { title: 'Fournitures de Cuisines', image: '/fourniturescuisines.png' },
];
const highTechItems = [
  { title: '', image: '/cuisinz.jpg' },
  { title: '', image: '/électroménager1.jpg' },
  { title: '', image: '/electromenager.webp' },
];


function CuisineMaison() {
  return (
    <div className='bg-gray'>
    <Header />
    <div className="row">
<div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
<Sidebar />
</div>
<div className="col-xl-10">
    <Container>
   {/* Carousel */}
      <h2 className="text-center my-4">Cuisine et Maison</h2>
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
                    height: '400px',      // Taille de base de l'image
                    transform: 'scale(1.6)', // Agrandit l’image de 20%
                    objectFit: 'contain',  // Préserve l’image sans la rogner
                    transition: 'transform 0.3s', // Animation fluide (facultatif)
                
                  }}
                />
                <h5 className="mt-3">{item.title}</h5>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Circular Images Below the Carousel */}
      <h3 className="text-center my-4">Explorez plus de catégories de Cuisine et maison</h3>
      <Row className="justify-content-center">
        {cuisineMaisonCategories.map((category, index) => (
          <Col md={3} sm={6} xs={12} key={index} className="text-center mb-4">
            <img
              src={category.image}
              alt={category.title}
              className="img-fluid rounded-circle"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover' // Garde un bon rendu dans un cercle
              }}
            />
            <h6 className="mt-2">{category.title}</h6>
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

export default CuisineMaison;
