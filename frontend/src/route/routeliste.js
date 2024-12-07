import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signup';
import Ajoutproduit from '../pages/ajoutProduit';
import HighTech from '../pages/categories/HighTech';
import CuisineMaison from '../pages/categories/CuisineMaison';
import Beaute from '../pages/categories/Beaute';
import Panier from '../pages/panier';
import Smartphone from '../pages/produits/smartphones';
import Ordinateur from '../pages/produits/ordinateurs';
import Smartwatches from '../pages/produits/smartwatches';
import Tablettes from '../pages/produits/tablette';
import Parfums from '../pages/produits/parfums';
import Maquillage from '../pages/produits/maquillage';
import Soins from '../pages/produits/soins';
import Coiffure from '../pages/produits/coiffure';
import Electro from '../pages/produits/electromenager';
import Meubles from '../pages/produits/meubles';
import Fournitures from '../pages/produits/fournitures';
import CheckoutPage from '../pages/CheckoutPage';
import Dashboard from '../admin/dashboard';
import Myproduct from '../pages/Mes produits';
import ApercuProduit from '../pages/apercuProduit';
import ProtectedRoute from '../protectedRoute/ProtectedRoute'; // Importer le composant ProtectedRoute
import Products from '../admin/Products';

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
      <Route path="/smartphone" element={<Smartphone />} />
      <Route path="/ordinateur" element={<Ordinateur />} />
      <Route path="/smartwatch" element={<Smartwatches />} />
      <Route path="/tablette" element={<Tablettes />} />
      <Route path="/parfum" element={<Parfums />} />
      <Route path="/maquillage" element={<Maquillage />} />
      <Route path="/soins" element={<Soins />} />
      <Route path="/coiffure" element={<Coiffure />} />
      <Route path="/electro" element={<Electro />} />
      <Route path="/meuble" element={<Meubles />} />
      <Route path="/fourniture" element={<Fournitures />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      
      {/* Route protégée pour le Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
           <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/mesproduits" element={<Myproduct />} />
      <Route path="/apercuproduit/:productId" element={<ApercuProduit />} />
    </Routes>
  );
};

export default RouteList;
