import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Importation de Link pour la navigation
import '../App.css'; 

const categories = [
  { title: 'High-Tech', image: '/high-tech.jpg', description: 'Ordinateurs, Téléphones, etc.', link: '/high-tech' },
  { title: 'Cuisine et maison', image: '/electro.jpg', description: 'Meubles, Électroménager.', link: '/cuisine-maison' },
  { title: 'Beauté', image: '/beaute.jpg', description: 'Maquillage, soins.', link: '/beaute' }
];

function CategoriesGrid() {
  return (
    <Container className="categories-grid">
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col md={4} key={index}> 
            <Link to={category.link}> {/* Utilisation de Link pour la redirection */}
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
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesGrid;
