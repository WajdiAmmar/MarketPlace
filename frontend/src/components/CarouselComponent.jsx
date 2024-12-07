import React from 'react';
import { Carousel, Button } from 'react-bootstrap'; // Importation de Carousel et Button depuis react-bootstrap
import '../Styles/carousel.css'; // Importation du fichier CSS pour styliser le carousel
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate pour la navigation

function CarouselComponent() {
  const navigate = useNavigate(); // Initialisation du hook useNavigate pour gérer la navigation
  const handleLoginClick = () => {
    navigate("/login"); // Fonction pour rediriger vers la page de connexion
  };

  return (
    // Carousel avec une pause automatique et un intervalle de 3000 ms (3 secondes)
    <Carousel interval={3000} pause="hover" indicators={true}>
      
      {/* Diapositive 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/3.png" // Source de l'image pour la première diapositive
          alt="Première diapositive" // Texte alternatif pour l'image
        />
        <Carousel.Caption>
          <div className="container-3"> {/* Conteneur pour le bouton */}
            <Button className="custom-button-1" onClick={handleLoginClick}>Se connecter</Button> {/* Bouton pour se connecter */}
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositive 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/2.png" // Source de l'image pour la deuxième diapositive
          alt="Deuxième diapositive" // Texte alternatif pour l'image
        />
        <Carousel.Caption>     
          <div className="container-1"> {/* Conteneur pour le bouton */}
            <Button className="custom-button"> Best offers </Button> {/* Bouton pour les meilleures offres */}
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositive 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/1.png" // Source de l'image pour la troisième diapositive
          alt="Troisième diapositive" // Texte alternatif pour l'image
        />
        <Carousel.Caption>
          <div className="container-1"> {/* Conteneur pour le bouton */}
            <Button className="custom-button-2">Commence Ici</Button> {/* Bouton pour démarrer ici */}
          </div>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default CarouselComponent; // Exportation du composant CarouselComponent
