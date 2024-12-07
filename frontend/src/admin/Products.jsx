// Importation des modules nécessaires
import React, { useEffect, useState } from 'react'; // Importation de React et des hooks useState et useEffect
import Header from '../components/Header'; // Importation du composant Header (pour l'en-tête)
import Footer from '../components/Footer'; // Importation du composant Footer (pour le pied de page)
import CardGrid from '../components/CardGrid'; // Importation du composant CardGrid (pour afficher les produits sous forme de cartes)
import { Container } from 'react-bootstrap'; // Importation du composant Container de React-Bootstrap pour le layout
import Sidebar from '../components/Sidebar'; // Importation du composant Sidebar (pour la barre latérale)
import Swal from 'sweetalert2'; // Importation de SweetAlert2 pour les alertes personnalisées

// Définition du composant Products
const Products = () => {

    // Définition de l'état local pour stocker la liste des produits
    const [products, setProducts] = useState([]);
  // État pour gérer la plage de prix sélectionnée pour le filtrage
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);
  
  // État pour gérer la catégorie sélectionnée pour le filtrage
  const [selectedCategory, setSelectedCategory] = useState('');
    // Utilisation de useEffect pour charger les produits au démarrage du composant
    useEffect(() => {
      // Fonction pour récupérer les produits depuis l'API
      const fetchProducts = async () => {
        try {
          // Requête pour récupérer les produits
          const response = await fetch('https://marketplace-happyshop.up.railway.app/api/products/products');
          
          // Si la réponse n'est pas OK, on lance une erreur
          if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des produits: ${response.statusText}`);
          }
          
          // Conversion de la réponse en format JSON
          const data = await response.json();
          
          // Mise à jour de l'état avec les produits récupérés
          setProducts(data);
        } catch (error) {
          // Affichage d'une erreur dans la console si la récupération échoue
          console.error("Erreur lors de la récupération des produits :", error.message);
        }
      };
  
      // Appel de la fonction pour récupérer les produits
      fetchProducts();
    }, []); // Le tableau vide [] assure que la fonction ne s'exécute qu'une seule fois, au chargement du composant

    // Fonction pour gérer la suppression d'un produit
    const handleDelete = async (productId) => {
        try {
          // Envoi de la requête DELETE pour supprimer le produit
          const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/products/${productId}`, {
            method: 'DELETE', // Méthode DELETE
          });
      
          // Si la réponse n'est pas OK, on lance une erreur
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression du produit');
          }
      
          // Suppression du produit de l'état local après une suppression réussie
          setProducts(products.filter(product => product.id !== productId));
          
          // Affichage d'une alerte de succès avec SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Produit supprimé',
            text: 'Le produit a été supprimé avec succès.',
          });
        } catch (error) {
          // Affichage d'une alerte d'erreur en cas de problème
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du produit.',
          });
        }
      };
 // Filtrage des produits en fonction des critères de recherche, de catégorie et de plage de prix
 const filteredProducts = products.filter(product => {
  const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée
  const matchesCategory = selectedCategory === '' || product.category === selectedCategory; // Vérifie si le produit correspond à la catégorie sélectionnée

  return isInPriceRange && matchesCategory; // Retourne vrai si tous les critères sont respectés
});

    return (
        // Structure du composant Products
        <div className="App bg-light">
          {/* Affichage du composant Header */}
          <Header />
          
          {/* Structure de la page avec une colonne pour la barre latérale et une pour le contenu principal */}
          <div className="row">
            
            {/* Sidebar à gauche */}
            <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
            <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
            onCategoryChange={setSelectedCategory} // Gestion du changement de catégorie
          />
            </div>

            {/* Contenu principal à droite */}
            <div className="col-xl-10 main-content">
              {/* Conteneur pour afficher les produits */}
              <Container>
                <h2 className="text-center my-4">Tous les Produits</h2>
                {/* Affichage des produits sous forme de cartes avec le composant CardGrid */}
                <CardGrid products={filteredProducts} isMyProductsPage={true} handleDelete={handleDelete} />
              </Container>
            </div>
          </div>

          {/* Affichage du composant Footer */}
          <Footer />
        </div>
      );
}

// Exportation du composant Products pour l'utiliser dans d'autres parties de l'application
export default Products;
