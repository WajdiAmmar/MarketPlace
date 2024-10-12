import React from 'react'; 
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
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
            <Col md={9}>
  <h1 className="header-title">
    <i>HAPPY</i>
    <b style={{ color: '#F9A825' }}>shop</b>
    <img 
      src="/emoji.jpg" 
      alt="Logo" 
      style={{ width: '60px', height: '60px', marginLeft: '40px' }}
    />
  </h1>
</Col>
          </Row>
        </Container>
      </div>

      {/* Barre de navigation */}
      <Navbar expand="lg" className="bg-dark text-light">
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-between align-items-center">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#service">Service</Nav.Link>
              <Nav.Link href="#team">Team</Nav.Link>
              <Nav.Link href="#project">Project</Nav.Link>
              <Nav.Link href="#pages">Pages</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Button variant="outline-light">Se connecter</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
