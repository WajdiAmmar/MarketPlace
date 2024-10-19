import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <MDBFooter bgColor="black" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span className="text-white">Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset" aria-label="Facebook">
            <MDBIcon className="text-warning" fab icon="facebook-f" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Twitter">
            <MDBIcon className="text-warning" fab icon="twitter" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Google">
            <MDBIcon className="text-warning" fab icon="google" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Instagram">
            <MDBIcon className="text-warning" fab icon="instagram" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="LinkedIn">
            <MDBIcon className="text-warning" fab icon="linkedin" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="GitHub">
            <MDBIcon className="text-warning" fab icon="github" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">
                <Col md={2} className="logo">
                  <img src="/logo.png" alt="Logo" className="logo-img" />
                </Col>
              </h6>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Products</h6>
              <p>
                <a href="#" className="text-reset text-white">
                  Angular
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  React
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  Vue
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Useful links</h6>
              <p>
                <a href="#" className="text-reset text-white">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  Settings
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  Orders
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-white">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Contact</h6>
              <p className="text-white">
                <MDBIcon className="text-warning me-2" icon="home" />
                New York, NY 10012, US
              </p>
              <p className="text-white">
                <MDBIcon className="text-warning me-3" icon="envelope" />
                info@example.com
              </p>
              <p className="text-white">
                <MDBIcon className="text-warning me-3" icon="phone" /> + 01 234 567 88
              </p>
              <p className="text-white">
                <MDBIcon className="text-warning me-3" icon="print" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <span className="text-white">
          © 2021 Copyright:
          <a className="text-reset fw-bold text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </span>
      </div>
    </MDBFooter>
  );
};

export default Footer;
