import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onProfileClick }) => {
  return (
    <nav style={{
      padding: 20,
      backgroundColor: '#eee',
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
    }}>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'navbar-brand active' : 'navbar-brand'}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/newpatient"
        className={({ isActive }) => isActive ? 'navbar-brand active' : 'navbar-brand'}
      >
        Add Patient
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => isActive ? 'navbar-brand active' : 'navbar-brand'}
      >
        Reports
      </NavLink>
    </nav>
  );
};

export default Navbar;
