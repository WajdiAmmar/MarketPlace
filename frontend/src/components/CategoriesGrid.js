import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Pour la navigation
import { useSelector } from 'react-redux'; // Pour récupérer l'état global
import Swal from 'sweetalert2';
import '../App.css';

const categories = [
  { title: 'High-Tech', image: '/high-tech.jpg', description: 'Ordinateurs, Téléphones, etc.', link: '/high-tech' },
  { title: 'Cuisine et maison', image: '/electro.jpg', description: 'Meubles, Électroménager.', link: '/cuisine-maison' },
  { title: 'Beauté', image: '/beaute.jpg', description: 'Maquillage, soins.', link: '/beaute' },
  // Ajoutez d'autres catégories si nécessaire
];

function CategoriesGrid() {
  const navigate = useNavigate(); // Pour la navigation
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Récupère l'état de connexion de Redux

  const handleCategoryClick = (categoryLink) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Connectez-vous',
        text: 'Vous devez être connecté pour accéder à cette catégorie.',
        confirmButtonText: 'Se connecter',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirige vers la page de connexion
        }
      });
    } else {
      navigate(categoryLink); // Si connecté, redirige vers la catégorie
    }
  };

  return (
    <Container className="categories-grid">
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col md={4} key={index}>
            <Card className="category-card" onClick={() => handleCategoryClick(category.link)}>
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
