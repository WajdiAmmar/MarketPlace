import React from 'react';
import Login from '../pages/login';
import Signup from '../pages/signup';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/home';
const RouteList = () => {
    return (
<Routes>
    <Route path="/" element={<Home />}  />
 <Route path="/login" element={<Login />} />
 <Route path="/signup" element={<Signup />} />
</Routes>
  );
};

export default RouteList;