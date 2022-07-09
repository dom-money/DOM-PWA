/* eslint-disable max-len */
import React from 'react';

interface ArrowDownIconProps {
  color: string;
  opacity: string
}

const ArrowUpIcon = ({ color, opacity }: ArrowDownIconProps) => {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity={opacity} d="M0.5,1.8c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0L0.5,1.8z M6.7,7l0.5,0.5c-0.3,0.3-0.7,0.3-1,0L6.7,7z M11.8,0.8c0.3-0.3,0.7-0.3,1,0c0.3,0.3,0.3,0.7,0,1L11.8,0.8z M1.5,0.8l5.7,5.7l-1,1L0.5,1.8L1.5,0.8z M6.2,6.5l5.7-5.7l1,1 L7.2,7.5L6.2,6.5z" fill={color}/>
    </svg>
  );
};

export default ArrowUpIcon;
