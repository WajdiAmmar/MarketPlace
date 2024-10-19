import React from 'react';
import Header from '../components/Header';  // Importer le Header
import MainBanner from '../components/MainBanner';  // Importer le MainBanner
import CategoriesGrid from '../components/CategoriesGrid';  // Importer la grille des catégories
import Footer from '../components/Footer';  // Importer le Footer
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import CarouselComponent from '../components/CarouselComponent';

const Home = () => {
  return (
    
<div className="App">
<Header />
<div className="row">
<div className="sidebarArea col-xl-2 sidebar" id="sidebarArea">
<Sidebar />
</div>
<div className="col-xl-9 main-content"> 
<SearchBar />
<CarouselComponent/>
<div style={{ marginTop: '30px' }} />
<CategoriesGrid />
<MainBanner />
</div>
</div>
<Footer />

</div>
  );
};

export default Home;