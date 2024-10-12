import React from 'react';
import Header from './components/Header';  // Importer le Header
import MainBanner from './components/MainBanner';  // Importer le MainBanner
import CategoriesGrid from './components/CategoriesGrid';  // Importer la grille des catégories
import Footer from './components/Footer';  // Importer le Footer
import './App.css'; // Optionnel si vous avez des styles personnalisés

function App() {
  return (
    <div className="App">
      <Header />
      <MainBanner />
      <CategoriesGrid />
      <Footer />
    </div>
  );
}

export default App;
