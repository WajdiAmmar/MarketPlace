import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Container, Card, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Utiliser dispatch pour envoyer les actions
import { login } from '../../actions/authActions'; // Importer l'action de login
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();  // Hook pour dispatch l'action
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreurs, setErreurs] = useState({ email: '', motDePasse: '', global: '' });

    // Fonction de validation des champs
    const validerChamps = () => {
        let isValid = true;
        const erreursTemp = { email: '', motDePasse: '' };

        // Validation de l'email
        if (!email.trim()) {
            erreursTemp.email = "L'adresse email est requise.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            erreursTemp.email = "Veuillez entrer une adresse email valide.";
            isValid = false;
        }

        // Validation du mot de passe
        if (!motDePasse.trim()) {
            erreursTemp.motDePasse = 'Le mot de passe est requis.';
            isValid = false;
        }

        setErreurs(erreursTemp);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validerChamps()) {
            return; // Si la validation échoue, on ne fait rien
        }

        try {
            const response = await fetch('https://marketplace-happyshop.up.railway.app/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, motDePasse }),
            });

            const data = await response.json();
            console.log('Réponse backend:', data);

            if (response.ok) {
                // Dispatch de l'action login avec le token et l'utilisateur récupérés
                dispatch(login(data.token, data.user));

                // Affichage d'une alerte de succès
                Swal.fire({
                    icon: 'success',
                    title: 'Connexion réussie',
                    text: `Bienvenue ${data.user.role}!`,
                }).then(() => {
                    // Rediriger en fonction du rôle de l'utilisateur
                    navigate(data.user.role === 'admin' ? '/dashboard' : '/');
                });
            } else {
                // Gestion des erreurs globales si la connexion échoue
                setErreurs({ ...erreurs, global: data.message || 'Erreur de connexion. Veuillez vérifier vos informations.' });
            }
        } catch (error) {
            console.error('Erreur lors de la requête de connexion :', error);
            setErreurs({ ...erreurs, global: 'Une erreur est survenue. Veuillez réessayer.' });
        }
    };

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center h-100">
                <Col md="9">
                    <Card className="my-4">
                        <Row className="g-0">
                            <Col md="6" className="d-none d-md-block">
                                <Image src="/signin.png" alt="Sample photo" className="rounded-start" fluid />
                            </Col>
                            <Col md="6">
                                <Card.Body className="text-black d-flex flex-column justify-content-center">
                                    <Col className="mx-auto mb-3">
                                        <Image src="/logo.png" alt="Logo" className="logo-img" onClick={() => navigate('/')} />
                                    </Col>
                                    <Form onSubmit={handleSubmit}>
                                        {/* Champ Adresse Email */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder="Adresse Email"
                                                size="lg"
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!!erreurs.email}
                                            />
                                            <Form.Text className="text-danger">
                                                {erreurs.email}
                                            </Form.Text>
                                        </Form.Group>

                                        {/* Champ Mot de Passe */}
                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                placeholder="Mot de passe"
                                                size="lg"
                                                type="password"
                                                value={motDePasse}
                                                onChange={(e) => setMotDePasse(e.target.value)}
                                                isInvalid={!!erreurs.motDePasse}
                                            />
                                            <Form.Text className="text-danger">
                                                {erreurs.motDePasse}
                                            </Form.Text>
                                        </Form.Group>

                                        {/* Message d'erreur global */}
                                        {erreurs.global && (
                                            <p className="text-danger mb-3">{erreurs.global}</p>
                                        )}

                                        <Row>
                                            <Col>
                                                <p className="small mb-3 pb-lg-2">
                                                    <a className="text-black-50" href="#!">Mot de passe oublié ?</a>
                                                </p>
                                            </Col>
                                        </Row>
                                        <p className="small mb-3 pb-lg-2">
                                            <a className="text-black-50" href="#!" onClick={() => navigate('/Signup')}>
                                                Vous n'avez pas de compte ?
                                            </a>
                                        </p>
                                        <Button variant="warning" size="lg" className="w-100" type="submit">
                                            Se Connecter
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

export default Login;
