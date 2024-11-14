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
import Parfums from '../pages/produits/parfums';
import Maquillage from '../pages/produits/maquillage';
import Soins from '../pages/produits/soins';
import Coiffure from '../pages/produits/coiffure';
import Electro from '../pages/produits/electromenager';
import Meubles from '../pages/produits/meubles';
import Fournitures from '../pages/produits/fournitures';
import CheckoutPage from '../pages/CheckoutPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import PaymentPage from '../pages/PaymentPage';
import DeliveryPage from '../pages/DeliveryPage';
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
      <Route path="/parfum" element={<Parfums />}/>
      <Route path="/maquillage" element={<Maquillage />}/>
      <Route path="/soins" element={<Soins />}/>
      <Route path="/coiffure" element={<Coiffure />}/>
      <Route path="/electro" element={<Electro />}/>
      <Route path="/meuble" element={<Meubles/>}/>
      <Route path="/fourniture" element={<Fournitures/>}/>
      <Route path="/checkout" element={<CheckoutPage />} /> {/* Page Checkout */}
      <Route path="/personal-info" element={<PersonalInfoPage/>} />
      <Route path="/delivery-method" element={<DeliveryPage />} />
      <Route path="/payment-info" element={<PaymentPage />} />
    </Routes>
  );
};

export default RouteList;
