/* eslint-disable max-len */
import React from 'react';

interface TransferFundsIconProps {
  color: string;
}

const TransferFundsIcon = ({ color }: TransferFundsIconProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10L10 15L20 20L30 15L20 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 25L20 30L30 25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 20L20 25L30 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default TransferFundsIcon;
