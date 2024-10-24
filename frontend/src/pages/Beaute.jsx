import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// Produits de Beauté
const beautyItems = [
  { title: '', image: '/creme1.jpg' },
  { title: '', image: '/Makeup1.jpg' },
  { title: '', image: '/parfum.jpg' },
  { title: '', image: '/haircare1.jpg' }
];

// Catégories de Beauté
const beautyCategories = [
  { title: 'Soins de la peau', image: '/soin.jpg' },
  { title: 'Maquillage', image: '/makeup.jpg' },
  { title: 'Parfums', image: '/parfum.png' },
  { title: 'Cheveux', image: '/cheveux.jpg' }
];

function BeautyCarousel() {
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

export default BeautyCarousel;
