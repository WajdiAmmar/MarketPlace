import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css'; // Assurez-vous d'importer votre fichier CSS

const categories = [
  { title: 'High-Tech', image: '/high-tech.jpg', description: 'Ordinateurs, Téléphones, etc.' },
  { title: 'Cuisine et maison', image: '/electro.jpg', description: 'Meubles, Électroménager.' },
  { title: 'Beauté', image: 'beaute.jpg', description: 'Maquillage, soins.' }
];

function CategoriesGrid() {
  return (
    <Container className="categories-grid">
      <Row className="justify-content-center"> {/* Centrer les colonnes */}
        {categories.map((category, index) => (
          <Col md={4} key={index}> 
            <Card className="category-card">
              <Card.Img 
                variant="top" 
                src={category.image} 
                style={{ height: '250px', objectFit: 'cover' }} 
              />
              <Card.Body>
                <Card.Title>{category.title}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesGrid;
