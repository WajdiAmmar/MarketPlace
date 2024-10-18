import React, { useState } from 'react';
import {
  MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage,
  MDBRow, MDBCol, MDBInput, MDBIcon, MDBRadio
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase'; // Import Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();

  // États pour stocker les informations de l'utilisateur
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [genre, setGenre] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        // Créer un utilisateur avec Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
        
        // Vérifier si l'utilisateur est bien créé
        console.log("Utilisateur créé avec succès :", userCredential.user);

        // Ajouter l'utilisateur dans la base Firestore
        const userDocRef = await addDoc(collection(db, 'users'), {
            uid: userCredential.user.uid,
            nom,
            prenom,
            genre,
            email,
        });

        console.log("Utilisateur ajouté à Firestore avec ID :", userDocRef.id);
        
        alert('Inscription réussie !');
        navigate('/Login'); // Rediriger vers la page de connexion
    } catch (error) {
        console.error('Erreur lors de l\'inscription : ', error);
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
};

  return (
    <MDBContainer>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol md='9'>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src="/signin.png" alt="Sample photo" className="rounded-start" fluid />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCol md={2} className="logo">
                  <img src="/logo.png" alt="Logo" className="logo-img" />
                </MDBCol>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <MDBInput
                    wrapperClass='mb-4'
                    placeholder='Nom'
                    size='lg'
                    type='text'
                    onChange={(e) => setNom(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    placeholder='Prenom'
                    size='lg'
                    type='text'
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                  <div className='d-md-flex justify-content-start align-items-center mb-4'>
                    <h6 className="fw-bold mb-0 me-4">Genre: </h6>
                    <MDBRadio
                      name='inlineRadio'
                      id='inlineRadio1'
                      value='Femme'
                      label='Femme'
                      inline
                      onChange={(e) => setGenre(e.target.value)}
                    />
                    <MDBRadio
                      name='inlineRadio'
                      id='inlineRadio2'
                      value='Homme'
                      label='Homme'
                      inline
                      onChange={(e) => setGenre(e.target.value)}
                    />
                    <MDBRadio
                      name='inlineRadio'
                      id='inlineRadio3'
                      value='Autres'
                      label='Autres'
                      inline
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                  <MDBInput
                    wrapperClass='mb-4'
                    placeholder='Adresse Email'
                    size='lg'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass='mb-4'
                    placeholder='Mot de passe'
                    size='lg'
                    type='password'
                    onChange={(e) => setMotDePasse(e.target.value)}
                  />
                  <MDBRow>
                    <MDBCol>
                      <p className="small mb-3 pb-lg-2">
                        <a className="text-black-50" href="#!" onClick={() => navigate('/Login')}>
                          Vous avez déjà un compte ?
                        </a>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBBtn style={{ backgroundColor: '#F9A825' }} size='lg' onClick={handleSignup}>
                    S'inscrire
                  </MDBBtn>
                  <p>Ou :</p>
                  <MDBBtn className="mb-2 w-100" style={{ backgroundColor: '#ffffff', color: '#000' }} size='lg'>
                    <MDBIcon fab icon='google' size="lg" className="mx-3 google-icon" />S'inscrire Avec Google
                  </MDBBtn>
                  <MDBBtn className="mb-2 w-100" style={{ backgroundColor: '#ffffff', color: '#000' }} size='lg'>
                    <MDBIcon fab icon='facebook' size="lg" className="mx-3 facebook-icon" />S'inscrire Avec Facebook
                  </MDBBtn>
                  <MDBBtn className="mb-2 w-100" style={{ backgroundColor: '#ffffff', color: '#000' }} size='lg'>
                    <MDBIcon fab icon='twitter' size="lg" className="mx-3 twitter-icon" />S'inscrire Avec Twitter
                  </MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
