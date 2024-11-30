import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Container, Card, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Signup() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [genre, setGenre] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreurs, setErreurs] = useState({});

    // Fonction de validation des champs
    const validerChamps = () => {
        let isValid = true;
        const erreursTemp = {};

        if (!nom.trim()) {
            erreursTemp.nom = 'Le nom est requis.';
            isValid = false;
        }

        if (!prenom.trim()) {
            erreursTemp.prenom = 'Le prénom est requis.';
            isValid = false;
        }

        if (!genre) {
            erreursTemp.genre = 'Veuillez sélectionner un genre.';
            isValid = false;
        }

        if (!email.trim()) {
            erreursTemp.email = "L'adresse email est requise.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            erreursTemp.email = "Veuillez entrer une adresse email valide.";
            isValid = false;
        }

        if (!motDePasse.trim()) {
            erreursTemp.motDePasse = 'Le mot de passe est requis.';
            isValid = false;
        } else if (motDePasse.length < 6) {
            erreursTemp.motDePasse = 'Le mot de passe doit comporter au moins 6 caractères.';
            isValid = false;
        }

        setErreurs(erreursTemp);
        return isValid;
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validerChamps()) {
            return; // Arrête si la validation échoue
        }

        try {
            const response = await fetch('https://marketplace-happyshop.up.railway.app/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, prenom, genre, email, motDePasse }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erreur lors de l\'inscription.');
            }
            Swal.fire({
                icon: 'success',
                title: 'Inscription réussie',
                text: 'Votre compte a été créé avec succès !',
            }).then(() => navigate('/Login'));

        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            setErreurs({ global: error.message });
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
                                        <Image src="/logo.png" alt="Logo" className="logo-img" onClick={() => navigate('/')} />
                                    </Col>
                                    <Form onSubmit={handleSignup}>
                                        {/* Champ Nom */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Nom'
                                                size='lg'
                                                type='text'
                                                value={nom}
                                                onChange={(e) => setNom(e.target.value)}
                                                isInvalid={!!erreurs.nom}
                                            />
                                            <Form.Text className="text-danger">{erreurs.nom}</Form.Text>
                                        </Form.Group>

                                        {/* Champ Prénom */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Prénom'
                                                size='lg'
                                                type='text'
                                                value={prenom}
                                                onChange={(e) => setPrenom(e.target.value)}
                                                isInvalid={!!erreurs.prenom}
                                            />
                                            <Form.Text className="text-danger">{erreurs.prenom}</Form.Text>
                                        </Form.Group>

                                        {/* Genre */}
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
                                            <Form.Text className="text-danger">{erreurs.genre}</Form.Text>
                                        </Form.Group>

                                        {/* Champ Adresse Email */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Adresse Email'
                                                size='lg'
                                                type='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!!erreurs.email}
                                            />
                                            <Form.Text className="text-danger">{erreurs.email}</Form.Text>
                                        </Form.Group>

                                        {/* Champ Mot de Passe */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder='Mot de passe'
                                                size='lg'
                                                type='password'
                                                value={motDePasse}
                                                onChange={(e) => setMotDePasse(e.target.value)}
                                                isInvalid={!!erreurs.motDePasse}
                                            />
                                            <Form.Text className="text-danger">{erreurs.motDePasse}</Form.Text>
                                        </Form.Group>
                                        <p className="small mb-3 pb-lg-2">
                                            <a className="text-black-50" href="#!" onClick={() => navigate('/login')}>
                                                Vous avez déjà un compte ?
                                            </a>
                                        </p>
                                        {/* Message d'erreur global */}
                                        {erreurs.global && (
                                            <p className="text-danger mb-3">{erreurs.global}</p>
                                        )}

                                        <Button
                                            variant="warning"
                                            size='lg'
                                            className="w-100"
                                            type="submit"
                                        >
                                            S'inscrire
                                        </Button>
                                    </Form>
                                    <p className="mt-3">Ou :</p>
                                    <Button variant="light" className="mb-2 w-100" size="lg">
                                        <i className="fab fa-google mx-3 text-danger"></i> Continuer Avec Google
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

export default Signup;
