import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};



