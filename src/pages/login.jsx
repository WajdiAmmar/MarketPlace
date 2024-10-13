import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' 
            style={{
              borderRadius: '1rem', 
              maxWidth: '500px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Ajout de l'ombre ici
            }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <div className="text-center mb-4">
                <img src="/logo.png" alt="Logo" className="logo-img" style={{height: '200px', marginLeft:'-50px'}} />
             </div>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <MDBInput wrapperClass='mb-4 w-100' placeholder='Addresse Email' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' placeholder='Mot de passe' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn style={{backgroundColor: '#F9A825', border:'none'}} size='lg'>
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39',border:'none'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998', border:'none'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign in with facebook
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
