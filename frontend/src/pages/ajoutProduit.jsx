import React, { useState } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import Header from '../components/Header'
import Footer from '../components/Footer'
const Ajoutproduit = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    image: null,
  });
  
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted: ', product);
    
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('condition', product.condition);
    formData.append('description', product.description);
    formData.append('image', product.image);

    // Simulate form submission (replace with actual API call)
    console.log('Form Data: ', formData);
  };

  return (
    <div className="bg-white">
    <Header />
      <Row>
        {/* Left column for the form */}
        <Col md={3} className="p-3 bg-black text-white">
          <h3>Article à vendre</h3>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-3 " controlId="formTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Entrez le titre du produit"
                value={product.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Entrez le prix du produit"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="electronics">Électronique</option>
                <option value="furniture">Meubles</option>
                <option value="clothing">Vêtements</option>
                <option value="vehicles">Véhicules</option>
              </Form.Select>
            </Form.Group>

            {/* Condition */}
            <Form.Group className="mb-3" controlId="formCondition">
              <Form.Label>État</Form.Label>
              <Form.Select
                name="condition"
                value={product.condition}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez l'état du produit</option>
                <option value="new">Neuf</option>
                <option value="used">Occasion</option>
              </Form.Select>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Ajoutez une description du produit"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Ajouter une image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
  <Button className="mt-5" variant="outline-light" id="connecter-btn" type="submit" block>
    Publier l'annonce
  </Button>
</div>

          </Form>
        </Col>
        <Col md={7} className="bg-hover-light shadow-lg text-black p-5 ml-5 mt-5 mb-5 container">
        <Row>
        <Col md={7}>
            {/* Image Preview */}
            {previewImage ? (
              <div>
                <Image src={previewImage} alt="Aperçu du produit" className="img-fluid mt-1" />
              </div>
            ) : (
              <div className="text-muted">Pas d'image disponible</div>
            )}
          </Col>
        <Col>
          <h5>Aperçu de votre annonce</h5>
          <div className="p-3 border rounded">
            <p><strong>Titre: </strong>{product.title}</p>
            <p><strong>Prix: </strong>{product.price} TND</p>
            <p><strong>Catégorie: </strong>{product.category}</p>
            <p><strong>État: </strong>{product.condition}</p>
            <p><strong>Description: </strong>{product.description}</p>
            </div>
        </Col>
          </Row>
        </Col>
        </Row>
        <Footer />
        </div>
  );
};

export default Ajoutproduit;
