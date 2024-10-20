import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const cuisineMaisonItems = [
  { title: 'Petit Électroménager', image: '/electromenager.jpg' },
  { title: 'Meubles', image: '/meubles.jpg' },
  { title: 'Cuisine', image: '/cuisine.jpg' },
  { title: 'Rangements', image: '/rangements.jpg' }
];

function CuisineMaison() {
  return (
    <Container className="cuisine-maison-grid">
      <Row className="justify-content-center">
        {cuisineMaisonItems.map((item, index) => (
          <Col md={4} key={index}>
            <Card>
              <Card.Img variant="top" src={item.image} style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CuisineMaison;
