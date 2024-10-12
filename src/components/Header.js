import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import '../Styles/Header.css'; // Import du fichier CSS

function Header() {
  return (
    <div>
      {/* Partie supérieure du header */}
      <div className="top-bar">
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="logo">
              {/* Accédez à l'image directement depuis le dossier public */}
              <img src="/logo.png" alt="Logo" className="logo-img" />
            </Col>
         
          </Row>
        </Container>
      </div>

      {/* Barre de navigation */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#service">Service</Nav.Link>
              <Nav.Link href="#team">Team</Nav.Link>
              <Nav.Link href="#project">Project</Nav.Link>
              <Nav.Link href="#pages">Pages</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;  