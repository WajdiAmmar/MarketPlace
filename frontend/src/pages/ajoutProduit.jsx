// src/pages/Ajoutproduit.js
import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../Styles/Ajoutproduit.css';

const Ajoutproduit = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  const handlePlaceholderClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    const formData = new FormData(); // Créer un nouvel objet FormData
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('condition', product.condition);
    formData.append('description', product.description);
    formData.append('image', product.image); // Ajouter le fichier image

    try {
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        body: formData, // Ajouter formData au corps de la requête
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit');
      }

      const data = await response.json();
      console.log('Produit ajouté avec succès:', data);

      // Réinitialiser le formulaire après soumission
      setProduct({
        title: "",
        price: "",
        category: "",
        condition: "",
        description: "",
        image: null,
      });
      setPreviewImage(null); // Réinitialiser l'aperçu
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <Row>
        <Col md={3} className="p-4 bg-black text-white">
          <h3>Article à vendre</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formTitle">
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

            <Form.Group className="mb-4" controlId="formPrice">
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

            <Form.Group className="mb-4" controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="High-Tech">High-Tech</option>
                <option value="Cuisine et maison">Cuisine et maison</option>
                <option value="Beauté">Beauté</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formCondition">
              <Form.Label>État</Form.Label>
              <Form.Select
                name="condition"
                value={product.condition}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez l'état du produit</option>
                <option value="neuf">Neuf</option>
                <option value="Occasion">Occasion</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formDescription">
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

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />

            <div className="d-flex justify-content-center">
              <Button
                className="mt-5"
                variant="outline-light"
                type="submit"
                style={{ width: '100%' }}
              >
                Publier l'annonce
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={7} className="bg-hover-light shadow-lg text-black p-5 ml-5 mt-5 mb-5 container">
          <Row>
            <Col md={7}>
              {previewImage ? (
                <Image src={previewImage} alt="Aperçu du produit" className="img-fluid mt-1" />
              ) : (
                <div className="image-placeholder d-flex flex-column justify-content-center align-items-center"
                     onClick={handlePlaceholderClick}
                     style={{ height: '100%', cursor: 'pointer' }}>
                  <img className="w-50 mb-2" src="/plus.png" alt="Add" />
                  <span>Cliquez ici pour importer une image</span>
                </div>
              )}
              {previewImage && (
                <Button
                  className="mt-5 bg-black"
                  variant="outline-light"
                  onClick={handleChangeImage}
                  block={true}
                >
                  Changer l'image
                </Button>
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
