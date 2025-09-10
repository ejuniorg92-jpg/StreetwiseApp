import React from 'react';
import { NavLink } from 'react-router-dom';
export default function NavBar() {
  const linkCls = ({ isActive }) => (isActive ? 'active' : '');
  return (
    <div className="nav">
      <div className="logo brand">STREETWISE NULLFIRE</div>
      <div style={{ flex: 1 }} />
      <NavLink to="/" className={linkCls}>
        Home
      </NavLink>
      <NavLink to="/map" className={linkCls}>
        Map
      </NavLink>
      <NavLink to="/dashboard" className={linkCls}>
        Dashboard
      </NavLink>
    </div>
  );
}



