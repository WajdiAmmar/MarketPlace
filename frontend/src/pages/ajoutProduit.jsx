// src/pages/Ajoutproduit.js
import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../Styles/Ajoutproduit.css';

// Exemples de produits selon les catégories
const productsByCategory = {
  "High-Tech": [
    { id: 1, name: "Ordinateur" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Tablette" },
    { id: 4, name: "Smartwatch" },
  ],
  "Cuisine et maison": [
    { id: 4, name: "Meubles" },
    { id: 5, name: "Fournitures de cuisines" },
    { id: 6, name: "Électroménager" },
  ],
  "Beauté": [
    { id: 7, name: "Maquillage" },
    { id: 8, name: "Parfum" },
    { id: 9, name: "Soins de Peau" },
    { id: 10, name: "Coiffure" },
  ],
};

// Mots clés associés à chaque produit
const keywordsByProduct = {
  "Ordinateur": ["ordinateur", "PC", "technologie", "high-tech", "portable"],
  "Smartphone": ["smartphone", "téléphone", "mobile", "technologie", "high-tech","telephone"],
  "Tablette": ["tablette", "écran tactile", "high-tech", "mobile"],
  "Smartwatch": ["montre intelligente", "high-tech", "wearable", "technologie"],
  "Meubles": ["meubles", "déco", "maison", "mobilier"],
  "Fournitures de cuisines": ["cuisine", "fournitures", "maison", "accessoires"],
  "Électroménager": ["électroménager", "maison", "cuisine", "appareil"],
  "Maquillage": ["beauté", "maquillage", "cosmétiques", "soins"],
  "Parfum": ["parfum", "beauté", "fragrance", "soins"],
  "Soins de Peau": ["beauté", "soins", "peau", "cosmétiques"],
  "Coiffure": ["coiffure", "beauté", "cheveux", "soins"],
};

const Ajoutproduit = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    Product: "",
    condition: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [availableProducts, setAvailableProducts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({ ...product, category: selectedCategory, Product: "" });
    // Mettre à jour les produits disponibles selon la catégorie sélectionnée
    if (selectedCategory) {
      setAvailableProducts(productsByCategory[selectedCategory]);
    } else {
      setAvailableProducts([]);
    }
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
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('Product', product.Product);
    formData.append('condition', product.condition);
    formData.append('description', product.description);
    
    // Ajout des mots clés en fonction du produit sélectionné
    const keywords = keywordsByProduct[product.Product] || [];
    formData.append('keywords', JSON.stringify(keywords)); // Stocker les mots clés sous forme de JSON

    formData.append('image', product.image);

    try {
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit');
      }

      const data = await response.json();
      console.log('Produit ajouté avec succès:', data);

      // Réinitialiser le formulaire
      setProduct({
        title: "",
        price: "",
        category: "",
        Product: "",
        condition: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  return (
    <div className="bg-light">
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
                onChange={handleCategoryChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="High-Tech">High-Tech</option>
                <option value="Cuisine et maison">Cuisine et maison</option>
                <option value="Beauté">Beauté</option>
              </Form.Select>
            </Form.Group>
            
            {/* Select pour les produits selon la catégorie */}
            <Form.Group className="mb-4" controlId="formProduct">
              <Form.Label>Produit</Form.Label>
              <Form.Select
                name="Product" 
                onChange={handleInputChange}
                value={product.Product}
                required
              >
                <option value="">Sélectionnez un produit</option>
                {availableProducts.map((prod) => (
                  <option key={prod.id} value={prod.name}>{prod.name}</option>
                ))}
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
                <p><strong>Produit: </strong>{product.Product}</p> 
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
