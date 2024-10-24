import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Ajoutproduit from '../pages/ajoutProduit';
import HighTech from '../pages/HighTech';
import CuisineMaison from '../pages/CuisineMaison';
import Beaute from '../pages/Beaute';
import Panier from '../pages/panier'

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ajoutProduit" element={<Ajoutproduit />} />
      {/* Ajout des nouvelles routes pour les catégories */}
      <Route path="/high-tech" element={<HighTech />} />
      <Route path="/cuisine-maison" element={<CuisineMaison />} />
      <Route path="/beaute" element={<Beaute />} />
      <Route path="/panier" element={<Panier />} />
    </Routes>
  );
};

export default RouteList;
