// Importation des modules nécessaires
import React from "react"; // Importation de React pour la création du composant
import Header from "../components/Header"; // Importation du composant Header (probablement une barre de navigation ou un en-tête)
import "../Styles/dashboard.css"; // Importation du fichier CSS spécifique au tableau de bord (Dashboard)

// Définition du composant fonctionnel Dashboard
function Dashboard() {
  return (
    <div>
      {/* Affichage du composant Header */}
      <Header />
      
      {/* Conteneur principal du tableau de bord avec une hauteur de 80% de la hauteur de la fenêtre */}
      <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        
        {/* Conteneur pour centrer l'iframe à l'intérieur de son parent */}
        <div
          style={{
            flex: 1, // L'élément prend tout l'espace disponible dans son conteneur parent
            display: "flex", // Utilisation du Flexbox pour l'alignement
            justifyContent: "center", // Centrer l'iframe horizontalement
            alignItems: "center", // Centrer l'iframe verticalement
          }}
        >
          {/* Intégration de l'iframe Power BI pour afficher un rapport embarqué */}
          <iframe
            title="marketplacewajdi" // Définition d'un titre pour l'iframe
            width="1200" // Largeur de l'iframe (1200 pixels)
            height="500" // Hauteur de l'iframe (500 pixels)
            // URL de l'iframe avec l'ID du rapport et des paramètres pour intégrer le rapport Power BI
            src="https://app.powerbi.com/reportEmbed?reportId=ac045878-9ce1-4e20-910c-4b2f2aa70a24&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61&filterPaneEnabled=false&navContentPaneEnabled=false"
            frameBorder="0" // Suppression de la bordure de l'iframe
            allowFullScreen="true" // Permet l'affichage en plein écran de l'iframe
          ></iframe>
        </div>
      </div>
    </div>
  );
}

// Export du composant Dashboard pour l'utiliser ailleurs dans l'application
export default Dashboard;
