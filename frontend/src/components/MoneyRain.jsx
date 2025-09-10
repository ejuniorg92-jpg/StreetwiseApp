// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect } from 'react';

const MoneyRain = () => {
  useEffect(() => {
    const createBill = () => {
      const bill = document.createElement('div');
      bill.className = 'bill';
      bill.textContent = '$100';
      bill.style.left = Math.random() * 100 + 'vw';
      bill.style.animationDuration = 3 + Math.random() * 2 + 's';
      document.body.appendChild(bill);

      setTimeout(() => bill.remove(), 5000);
    };

    const interval = setInterval(createBill, 300);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default MoneyRain;






