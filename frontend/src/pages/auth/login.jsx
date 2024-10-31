// src/components/Login.js

import React, { useState } from 'react';
import { Button, Container, Card, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); // Utiliser le hook useNavigate
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const handleLoginClick = () => {
        navigate('/Signup'); // Rediriger vers la page d'inscription
    };
    
    const handleHomeClick = () => {
        navigate('/'); // Rediriger vers la page d'accueil
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, motDePasse }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Message de succès
                navigate('/'); // Rediriger vers la page d'accueil ou tableau de bord
            } else {
                alert(data.message); // Message d'erreur
            }
        } catch (error) {
            console.error('Erreur lors de la connexion : ', error);
            alert('Erreur lors de la connexion. Veuillez réessayer.');
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
                                    <Col className="mx-auto mb-3">
                                        <Image src="/logo.png" alt="Logo" className="logo-img" onClick={handleHomeClick}/>
                                    </Col>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Adresse Email'
                                                size='lg'
                                                type='text'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Mot de passe'
                                                size='lg'
                                                type='password'
                                                value={motDePasse}
                                                onChange={(e) => setMotDePasse(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <p className="small mb-3 pb-lg-2">
                                                    <a className="text-black-50" href="#!">Mot de passe oublié ?</a>
                                                </p>
                                            </Col>
                                        </Row>
                                        <p className="small mb-3 pb-lg-2">
                                            <a className="text-black-50" href="#!" onClick={handleLoginClick}>
                                                Vous n'avez pas de compte ?
                                            </a>
                                        </p>
                                        <Button variant="warning" size='lg' className="w-100" type="submit">
                                            Se Connecter
                                        </Button>
                                    </Form>
                                    <p className="mt-3">Ou :</p>
                                    <Button variant="light" className="mb-2 w-100" size='lg'>
                                        <i className="fab fa-google mx-3 google-icon"></i> Continuer Avec Google
                                    </Button>
                                    <Button variant="light" className="mb-2 w-100" size='lg'>
                                        <i className="fab fa-facebook mx-3 facebook-icon"></i> Continuer Avec Facebook
                                    </Button>
                                    <Button variant="light" className="mb-2 w-100" size='lg'>
                                        <i className="fab fa-twitter mx-3 twitter-icon"></i> Continuer Avec Twitter
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
