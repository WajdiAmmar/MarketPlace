import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'
const highTechItems = [
  { title: '', image: '/lap1.jpg '},
  { title: '', image: '/phone2.jpg' },
  { title: '', image: '/ht.png' },
  { title: '', image: '/lap2.jpg '},
  { title: '', image: '/sw1.png' }
];

const highTechCategories = [
  { title: 'Laptops', image: '/ordinateur.jpg' },
  { title: 'Smartphones', image: '/smartphone.jpg' },
  { title: 'Tablettes', image: '/tablette.jpg' },
  { title: 'Smartwatches', image: '/smartwatch.jpg' }
];

function HighTechCarousel() {
  return (
    <div className='bg-white'>
    <Header />
    <div className="row">
<div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
<Sidebar />
</div>
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

export default HighTechCarousel;
