// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function CryptoLighting({ tier }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!tier) return;
    // Auto-light when tier changes
    setActive(true);
    const timer = setTimeout(() => setActive(false), 3000);
    return () => clearTimeout(timer);
  }, [tier]);

  const effects = {
    Streetwise: { color: 'silver', glow: '0 0 20px silver' },
    Hustler: { color: 'orangered', glow: '0 0 25px red' },
    Godmode: { color: 'gold', glow: '0 0 30px gold' },
  };

  const { color, glow } = effects[tier] || { color: '#fff', glow: 'none' };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: '20px',
        padding: '20px',
        border: `3px solid ${color}`,
        borderRadius: '15px',
        boxShadow: active ? glow : 'none',
        textAlign: 'center',
        color,
      }}
    >
      {tier} Tier Activated with Crypto Power
    </motion.div>
  );
}

export default timer;






