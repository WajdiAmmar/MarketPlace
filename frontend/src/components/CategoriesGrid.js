import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importation des composants de Bootstrap
import { useNavigate } from 'react-router-dom'; // Pour la navigation vers d'autres pages
import { useSelector } from 'react-redux'; // Pour récupérer l'état global de l'application (Redux)
import Swal from 'sweetalert2'; // Pour afficher des alertes personnalisées
import '../App.css'; // Importation du fichier CSS pour la mise en page

// Définition des catégories avec leurs informations (titre, image, description, lien)
const categories = [
  { title: 'High-Tech', image: '/high-tech.jpg', description: 'Ordinateurs, Téléphones, etc.', link: '/high-tech' },
  { title: 'Cuisine et maison', image: '/electro.jpg', description: 'Meubles, Électroménager.', link: '/cuisine-maison' },
  { title: 'Beauté', image: '/beaute.jpg', description: 'Maquillage, soins.', link: '/beaute' },
  // D'autres catégories peuvent être ajoutées ici
];

function CategoriesGrid() {
  const navigate = useNavigate(); // Initialisation du hook useNavigate pour la navigation
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Récupération de l'état de connexion de l'utilisateur depuis Redux

  // Fonction de gestion du clic sur une catégorie
  const handleCategoryClick = (categoryLink) => {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas connecté, affiche une alerte de connexion
      Swal.fire({
        icon: 'warning',
        title: 'Connectez-vous',
        text: 'Vous devez être connecté pour accéder à cette catégorie.',
        confirmButtonText: 'Se connecter',
        showCancelButton: true,
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirige l'utilisateur vers la page de connexion si confirmé
        }
      });
    } else {
      navigate(categoryLink); // Si l'utilisateur est connecté, le redirige vers la page de la catégorie
    }
  };

  return (
    <Container className="categories-grid"> {/* Conteneur pour afficher les catégories en grille */}
      <Row className="justify-content-center"> {/* Utilisation de la grille Bootstrap pour centrer les éléments */}
        {categories.map((category, index) => (
          <Col md={4} key={index}> {/* Colonne de taille moyenne pour chaque catégorie */}
            <Card className="category-card" onClick={() => handleCategoryClick(category.link)}>
              {/* Affichage de l'image de la catégorie */}
              <Card.Img
                variant="top"
                src={category.image}
                style={{ height: '250px', objectFit: 'cover' }} // Style pour ajuster l'image
              />
              <Card.Body>
                <Card.Title>{category.title}</Card.Title> {/* Titre de la catégorie */}
                <Card.Text>{category.description}</Card.Text> {/* Description de la catégorie */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoriesGrid; // Exportation du composant CategoriesGrid
