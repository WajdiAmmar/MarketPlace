// src/MainBanner.js
import React from 'react';
import '../App.css'; // Fichier CSS pour la bannière

function MainBanner() {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <h1>Nouvelle série originale</h1>
        <p>Découvrez la série <strong>Citadel Diana</strong> en streaming maintenant !</p>
        <button className="cta-button">Voir plus</button>
      </div>
    </div>
  );
}

export default MainBanner;
