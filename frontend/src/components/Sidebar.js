import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../App.css';  // Import du CSS personnalisé

const Sidebar = () => {
  return (
    <Nav className="sidebar-custom d-flex flex-column p-3">
      <NavLink to="/" className="nav-link sidebar-link mb-3">
        Home
      </NavLink>
      <NavLink to="/dashboard" className="nav-link sidebar-link">
        Dashboard
      </NavLink>
    </Nav>
  );
};

export default Sidebar;
