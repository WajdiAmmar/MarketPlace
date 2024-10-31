import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import Ajoutproduit from '../pages/ajoutProduit';
import HighTech from '../pages/categories/HighTech';
import CuisineMaison from '../pages/categories/CuisineMaison';
import Beaute from '../pages/categories/Beaute';
import Panier from '../pages/panier'
import Smartphone from '../pages/produits/smartphones'
import Ordinateur from '../pages/produits/ordinateurs'
import Smartwatches from '../pages/produits/smartwatches'
import Tablettes from '../pages/produits/tablette';

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ajoutProduit" element={<Ajoutproduit />} />
      <Route path="/high-tech" element={<HighTech />} />
      <Route path="/cuisine-maison" element={<CuisineMaison />} />
      <Route path="/beaute" element={<Beaute />} />
      <Route path="/panier" element={<Panier />} />
      <Route path="/smartphone" element={<Smartphone />}/>
      <Route path="/ordinateur" element={<Ordinateur />}/>
      <Route path="/smartwatch" element={<Smartwatches />}/>
      <Route path="/tablette" element={<Tablettes />}/>
    </Routes>
  );
};

export default RouteList;
