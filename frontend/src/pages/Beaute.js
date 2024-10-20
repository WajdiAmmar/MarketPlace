import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const beauteItems = [
  { title: 'Maquillage', image: '/maquillage.jpg' },
  { title: 'Soins de la peau', image: '/soins-peau.jpg' },
  { title: 'Parfums', image: '/parfums.jpg' },
  { title: 'Coiffure', image: '/coiffure.jpg' }
];

function Beaute() {
  return (
    <Container className="beaute-grid">
      <Row className="justify-content-center">
        {beauteItems.map((item, index) => (
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

export default Beaute;
