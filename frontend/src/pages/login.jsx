import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import '../Styles/login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate(); // Utiliser le hook useNavigate
   const handleLoginClick = () => {
    navigate('/Signup'); // Rediriger vers la page de connexion
  };
  return (
    <MDBContainer>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol md='9'>

          <MDBCard className='my-4'>

            <MDBRow className='g-0'>

              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src="/signin.png" alt="Sample photo" className="rounded-start" fluid/>
              </MDBCol>

              <MDBCol md='6'>
              <MDBCol md={2} className="logo">
              <img src="/logo.png" alt="Logo" className="logo-img" />
                </MDBCol>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <MDBInput wrapperClass='mb-4' placeholder='Adresse Email' size='lg' id='form6' type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='Mot de passe' size='lg' id='form6' type='text'/>
                  <MDBRow>
                    <MDBCol>
                  <p className="small mb-3 pb-lg-2"><a class="text-black-50" href="#!">Mot de Passe oublié ?</a></p>
                  </MDBCol>
  
                     <p className="small mb-3 pb-lg-2" ><a class="text-black-50" href="#!" onClick={handleLoginClick}>Vous n'avez pas de compte ?</a></p>

              </MDBRow>
              <MDBBtn style={{backgroundColor:'#F9A825'}} size='lg'>
                Se Connecter
                </MDBBtn>
              <p>
                Ou :</p>
              <MDBBtn className="mb-2 w-100" style={{backgroundColor: '#ffffff', color:'#000'}} size='lg'>
              <MDBIcon fab icon='google' size="lg" className="mx-3 google-icon "/>Continuer Avec Google
                </MDBBtn>
              <MDBBtn className="mb-2 w-100" style={{backgroundColor: '#ffffff', color:'#000'}} size='lg'>
              <MDBIcon fab icon='facebook' size="lg" className="mx-3 facebook-icon"/>Continuer Avec Facebook
                </MDBBtn>
                <MDBBtn className="mb-2 w-100"  style={{backgroundColor: '#ffffff',color:'#000'}} size='lg'>
              <MDBIcon fab icon='twitter' size="lg" className="mx-3 twitter-icon"/>Continuer Avec Twitter
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

export default Login;
