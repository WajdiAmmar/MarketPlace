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
  MDBIcon,
  MDBRadio
} from 'mdb-react-ui-kit';
import '../Styles/signup.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate(); // Utiliser le hook useNavigate
   const handleLoginClick = () => {
    navigate('/Login'); }
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
                <MDBInput wrapperClass='mb-4' placeholder='Nom' size='lg' id='form6' type='text'/>
                <MDBInput wrapperClass='mb-4' placeholder='Prenom' size='lg' id='form6' type='text'/>
                
                <div className='d-md-flex ustify-content-start align-items-center mb-4'>
                    <h6 class="fw-bold mb-0 me-4">Genre: </h6>
                    <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Femme' inline />
                    <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Homme' inline />
                    <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Autres' inline />
                  </div>
                  <MDBInput wrapperClass='mb-4' placeholder='Adresse Email' size='lg' id='form6' type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='Mot de passe' size='lg' id='form6' type='text'/>
                  <MDBRow>
                  <MDBCol>
                  <p className="small mb-3 pb-lg-2"><a class="text-black-50" href="#!" onClick={handleLoginClick}>Vous avez déja un compte ?</a></p>
                  </MDBCol>
              </MDBRow>
              <MDBBtn style={{backgroundColor:'#F9A825'}} size='lg'>
                S'inscrire
                </MDBBtn>
              <p>
                Ou :</p>
              <MDBBtn className="mb-2 w-100" style={{backgroundColor: '#ffffff', color:'#000'}} size='lg'>
              <MDBIcon fab icon='google' size="lg" className="mx-3 google-icon "/>S'inscrire Avec Google
                </MDBBtn>
              <MDBBtn className="mb-2 w-100" style={{backgroundColor: '#ffffff', color:'#000'}} size='lg'>
              <MDBIcon fab icon='facebook' size="lg" className="mx-3 facebook-icon"/>S'inscrire Avec Facebook
                </MDBBtn>
                <MDBBtn className="mb-2 w-100"  style={{backgroundColor: '#ffffff',color:'#000'}} size='lg'>
              <MDBIcon fab icon='twitter' size="lg" className="mx-3 twitter-icon"/>S'inscrire Avec Twitter
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
