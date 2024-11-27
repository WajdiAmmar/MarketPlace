import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaPhone} from 'react-icons/fa';
import '../Styles/footer.css'
const Footer = () => {
  return (
    <footer className="bg-black text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span className="text-white">Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="#" className="me-4 text-reset" aria-label="Facebook">
            <FaFacebookF className="text-warning" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Twitter">
            <FaTwitter className="text-warning" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Google">
            <FaGoogle className="text-warning" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="Instagram">
            <FaInstagram className="text-warning" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="LinkedIn">
            <FaLinkedin className="text-warning" />
          </a>
          <a href="#" className="me-4 text-reset" aria-label="GitHub">
            <FaGithub className="text-warning" />
          </a>
        </div>
      </section>

      <section>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md="3" lg="4" xl="3" className="mx-auto mb-4">
                <Col md={2}>
                  <img src="/logofooter.png" alt="Logo" className='logo-footer'/>
                </Col>
                <p className='text-white'>
              HappyShop, votre marketplace de confiance, vous propose une large sélection de produits de qualité à des prix imbattables. Explorez nos offres et profitez d'une expérience d'achat en ligne simple, rapide et sécurisée.
              </p>
             </Col>

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Gatégories</h6>
              <p className='text-white'>
                <a href="/high-tech" className="text-reset">High-Tech</a>
              </p>
              <p className='text-white'>
                <a href="/cuisine-maison" className="text-reset">Cuisine et Maison</a>
              </p>
              <p className='text-white'>
                <a href="/beaute" className="text-reset">Beauté</a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Liens utiles</h6>
              <p className='text-white'>
                <a href="/panier" className="text-reset">Panier</a>
              </p>
              <p className='text-white'>
                <a href="/mesproduits" className="text-reset">Mes Porduits</a>
              </p>
              <p className='text-white'>
                <a href="/ajoutProduit" className="text-reset">Vendre un Produit</a>
              </p>
              <p className='text-white'>
                <a href="#" className="text-reset">Contact</a>
              </p>

            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4 text-white">Contact</h6>
              <p className="text-white">
                <FaHome className="text-warning me-2" /> Tunis-Tunisia
              </p>
              <p className="text-white">
                <FaEnvelope className="text-warning me-3" /> Happyshop@gmail.com
              </p>
              <p className="text-white">
                <FaPhone className="text-warning me-3" /> + 216 99 555 666
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <span className="text-white">
          © 2021 Copyright:
          <a className="text-reset fw-bold text-white" href="/">
            HappyShop.com
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
