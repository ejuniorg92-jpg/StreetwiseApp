import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: 'black', color: 'lime' }}>
      <Link to="/" style={{ margin: '10px' }}>
        Streetwise
      </Link>
      <Link to="/hustler" style={{ margin: '10px' }}>
        Hustler
      </Link>
      <Link to="/godmode" style={{ margin: '10px' }}>
        Godmode
      </Link>
    </nav>
  );
}



