import React from 'react';
import { Container, Row, Col,Carousel } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'

const beauteItems = [
  { title: 'Maquillage', image: '/beaute.jpg' },
  { title: 'Outils de beauté', image: '/outilsbeaute.png' },
  { title: 'Crèmes', image: '/cremes.png' },
  { title: 'Parfums', image: '/parfum.png' },
];
const highTechItems = [
  { title: '', image: '/o1 (1).png' },
  { title: '', image: '/sp1.png' },
  { title: '', image: '/ht.png' },
  { title: '', image: '/sw1.png' }
];
function Beaute() {
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
      <h2 className="text-center my-4">Beauté</h2>
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
                    height: '300px',      // Taille de base de l'image
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
      <h3 className="text-center my-4">Explorez les catégories de beauté</h3>
      <Row className="justify-content-center">
        {beauteItems.map((category, index) => (
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

export default Beaute;
