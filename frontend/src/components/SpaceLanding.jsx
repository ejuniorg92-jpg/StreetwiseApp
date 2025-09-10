import React from 'react';
import './GalaxyBackground.css';

const SpaceLanding = () => {
  return (
    <div className="space-container">
      <div className="galaxy-overlay" />
      <div className="tier-message">
        <h1> Welcome to Streetwise</h1>
        <h2>Select Your Tier</h2>
      </div>
      <div className="floating-icons">
        <span className="float">$</span>
        <span className="float"></span>
        <span className="float">$</span>
        <span className="float"></span>
        <span className="float"></span>
      </div>
    </div>
  );
};

export default SpaceLanding;



