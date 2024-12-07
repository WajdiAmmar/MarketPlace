import React, { useEffect, useState } from 'react';
import CardGrid from '../components/CardGrid'; // Composant pour afficher une grille de cartes de produits
import Header from '../components/Header'; // Composant pour l'en-tête
import Sidebar from '../components/Sidebar'; // Barre latérale pour les filtres et la navigation
import Footer from '../components/Footer'; // Composant pour le pied de page
import { useSelector } from 'react-redux'; // Hook pour accéder à l'état global Redux
import Swal from 'sweetalert2'; // Librairie pour afficher des alertes élégantes

const Myproduct = () => {
 // État pour stocker les produits récupérés depuis l'API
 const [products, setProducts] = useState([]);
 
 // État pour gérer la plage de prix sélectionnée pour le filtrage
 const [selectedPriceRange, setSelectedPriceRange] = useState([0, 20000]);
 
 // État pour gérer la catégorie sélectionnée pour le filtrage
 const [selectedCategory, setSelectedCategory] = useState('');
  
  // Récupère l'ID de l'utilisateur connecté depuis l'état global Redux
  const userId = useSelector((state) => state.auth.user?.ID);

  // Utilise l'effet pour récupérer les produits de l'utilisateur dès que l'ID utilisateur change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/user/${userId}`); // Requête API pour récupérer les produits de l'utilisateur
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits'); // Lève une erreur si la requête échoue
        }
        const data = await response.json(); // Convertit les données en JSON
        setProducts(data); // Met à jour l'état local avec les produits récupérés
      } catch (error) {
        console.error(error); // Affiche une erreur dans la console
      }
    };

    fetchProducts(); // Appelle la fonction pour récupérer les produits
  }, [userId]); // Effet dépend de `userId`

  
  // Fonction pour gérer la suppression d'un produit
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://marketplace-happyshop.up.railway.app/api/products/products/${productId}`, {
        method: 'DELETE', // Méthode HTTP pour supprimer un produit
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit'); // Lève une erreur si la suppression échoue
      }

      // Supprime le produit de l'état local après une suppression réussie
      setProducts(products.filter(product => product.id !== productId));
      Swal.fire({
        icon: 'success',
        title: 'Produit supprimé',
        text: 'Le produit a été supprimé avec succès.', // Message de confirmation
      });
    } catch (error) {
      console.error(error); // Affiche une erreur dans la console
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression du produit.', // Message d'erreur
      });
    }
  };
  // Filtrage des produits en fonction de catégorie et de plage de prix
  const filteredProducts = products.filter(product => {
    
    const isInPriceRange = product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]; // Vérifie si le produit est dans la plage de prix sélectionnée
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory; // Vérifie si le produit correspond à la catégorie sélectionnée

    return isInPriceRange && matchesCategory; // Retourne vrai si tous les critères sont respectés
  });
  return (
    <div className="bg-white"> {/* Conteneur principal avec un fond blanc */}
      <Header /> {/* En-tête */}
      <div className="row">
        <div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
        <Sidebar 
            onPriceChange={setSelectedPriceRange} // Gestion du changement de plage de prix
            onCategoryChange={setSelectedCategory} // Gestion du changement de catégorie
          /> {/* Barre latérale */}
        </div>
        <div className="col-xl-10">
          <h2>Mes produits</h2> {/* Titre principal */}
          {products.length === 0 ? ( // Affiche un message si aucun produit n'est trouvé
            <p>Aucun produit trouvé.</p>
          ) : (
            // Affiche la grille de produits avec possibilité de suppression
            <CardGrid 
            products={filteredProducts} // Liste des produits de l'utilisateur
              isMyProductsPage={true} // Indique que c'est la page "Mes produits"
              handleDelete={handleDelete} // Fonction de suppression
            />
          )}
        </div>
      </div>
      <Footer /> {/* Pied de page */}
    </div>
  );
};

export default Myproduct; // Exporte le composant pour l'utiliser ailleurs
