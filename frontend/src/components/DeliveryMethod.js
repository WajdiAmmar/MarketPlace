import React from 'react';

const DeliveryForm = ({ formData, onNext, onPrevious, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="form-container">
      <h2>Mode de livraison</h2>
      <label>Choisissez un mode de livraison</label>
      <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
        {/* Option par défaut */}
        <option value="" disabled>Choisissez un mode de livraison</option>
        <option value="standard">Livraison standard (2-5 jours)</option>
        <option value="express">Livraison express (1-2 jours)</option>
        <option value="sameDay">Livraison le jour même</option>
      </select>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onPrevious}>Précédent</button>
        <button onClick={onNext}>Suivant</button>
      </div>
    </div>
  );
};

export default DeliveryForm;
