import React from 'react';
import Header from '../components/Header';  // Importer le Header
import MainBanner from '../components/MainBanner';  // Importer le MainBanner
import CategoriesGrid from '../components/CategoriesGrid';  // Importer la grille des catégories
import Footer from '../components/Footer';  // Importer le Footer
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
 <div className="App">

<Header />
<div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
          <Sidebar />
        </div>
<SearchBar />
<MainBanner />
<CategoriesGrid />
<Footer />
    </div>
  );
};

export default Home;