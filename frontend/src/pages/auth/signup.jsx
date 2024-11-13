import React, { useState } from 'react';
import {
  Button, Container, Card, Row, Col, Form, Image
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [genre, setGenre] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          prenom,
          genre,
          email,
          motDePasse,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log("Inscription réussie :", data);

      alert('Inscription réussie !');
      navigate('/Login'); // Rediriger vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de l\'inscription : ', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col md='9'>
          <Card className='my-4'>
            <Row className='g-0'>
              <Col md='6' className="d-none d-md-block">
                <Image src="/signin.png" alt="Sample photo" className="rounded-start" fluid />
              </Col>
              <Col md='6'>
                <Card.Body className='text-black d-flex flex-column justify-content-center'>
                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Control
                        placeholder='Nom'
                        size='lg'
                        type='text'
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Control
                        placeholder='Prénom'
                        size='lg'
                        type='text'
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">Genre:</Form.Label>
                      <Form.Check 
                        type="radio" 
                        label="Femme" 
                        name="genre" 
                        value="Femme" 
                        inline 
                        onChange={(e) => setGenre(e.target.value)} 
                      />
                      <Form.Check 
                        type="radio" 
                        label="Homme" 
                        name="genre" 
                        value="Homme" 
                        inline 
                        onChange={(e) => setGenre(e.target.value)} 
                      />
                      <Form.Check 
                        type="radio" 
                        label="Autres" 
                        name="genre" 
                        value="Autres" 
                        inline 
                        onChange={(e) => setGenre(e.target.value)} 
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Control
                        placeholder='Adresse Email'
                        size='lg'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Control
                        placeholder='Mot de passe'
                        size='lg'
                        type='password'
                        onChange={(e) => setMotDePasse(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="warning"
                      size='lg'
                      onClick={handleSignup}
                      className="w-100"
                    >
                      S'inscrire
                    </Button>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
