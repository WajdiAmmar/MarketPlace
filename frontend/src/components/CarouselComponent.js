import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import '../Styles/carousel.css';

function CarouselComponent() {
  return (
    <Carousel interval={3000} pause="hover" indicators={true}>
      {/* Diapositive 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/3.png" 
          alt="Première diapositive"
        />
        <Carousel.Caption>
        <div className="container-3">
  <Button className="custom-button-1">Se connecter</Button>
        </div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositive 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/2.png"
          alt="Deuxième diapositive"
        />
        <Carousel.Caption>     
          <div className="container-1">
          <Button className="custom-button"> Best offers </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositive 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/1.png"
          alt="Troisième diapositive"
        />
        <Carousel.Caption>
           <div className="container-1">
          <Button className="custom-button-2">Commence Ici</Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;