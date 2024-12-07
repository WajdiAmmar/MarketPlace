import React from 'react'; // Importation de React pour le composant

// Le composant DeliveryForm prend des props: formData (les données du formulaire), onNext (fonction pour passer à l'étape suivante), onPrevious (fonction pour revenir à l'étape précédente), et onChange (fonction pour mettre à jour les données du formulaire)
const DeliveryForm = ({ formData, onNext, onPrevious, onChange }) => {
  
  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target; // Récupère le nom du champ et sa valeur
    onChange(name, value); // Appelle la fonction onChange pour mettre à jour la donnée correspondante dans l'état du parent
  };

  return (
    <div className="form-container"> {/* Conteneur principal pour le formulaire */}
      <h2>Mode de livraison</h2> {/* Titre de la section */}
      
      {/* Label pour le champ de sélection de la méthode de livraison */}
      <label>Choisissez un mode de livraison</label>
      
      {/* Liste déroulante pour choisir la méthode de livraison */}
      <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
        {/* Option par défaut qui indique que l'utilisateur doit choisir une option */}
        <option value="" disabled>Choisissez un mode de livraison</option>
        {/* Options pour les différents modes de livraison */}
        <option value="standard">Livraison standard (2-5 jours)</option>
        <option value="express">Livraison express (1-2 jours)</option>
        <option value="sameDay">Livraison le jour même</option>
      </select>

      {/* Section pour les boutons de navigation (précédent et suivant) */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Bouton pour revenir à l'étape précédente */}
        <button onClick={onPrevious}>Précédent</button>
        {/* Bouton pour passer à l'étape suivante */}
        <button onClick={onNext}>Suivant</button>
      </div>
    </div>
  );
};

export default DeliveryForm; // Exportation du composant DeliveryForm
