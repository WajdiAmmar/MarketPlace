// src/CategoriesGrid.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css'; // CSS pour la grille

const categories = [
  { title: 'High-Tech', image: 'https://via.placeholder.com/150', description: 'Ordinateurs, Téléphones, etc.' },
  { title: 'Cuisine et maison', image: 'https://via.placeholder.com/150', description: 'Meubles, Électroménager.' },
  { title: 'Beauté', image: 'https://via.placeholder.com/150', description: 'Maquillage, soins.' },
  { title: 'Jeux vidéos', image: 'https://via.placeholder.com/150', description: 'Accessoires et consoles.' }
];

function CategoriesGrid() {
  return (
    <Container className="categories-grid">
      <Row>
        {categories.map((category, index) => (
          <Col md={3} key={index}>
            <Card className="category-card">
              <Card.Img variant="top" src={category.image} />
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
