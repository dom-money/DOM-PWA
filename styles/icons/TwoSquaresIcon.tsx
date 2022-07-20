/* eslint-disable max-len */
import React from 'react';

interface TwoSquaresIconProps {
  color: string;
}

const TwoSquaresIcon = ({ color }: TwoSquaresIconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.25" y="0.964279" width="13.7857" height="13.7857" stroke={color} strokeWidth="0.5"/>
      <rect x="5.96429" y="5.24995" width="13.7857" height="13.7857" stroke={color} strokeWidth="0.5"/>
    </svg>
  );
};

export default TwoSquaresIcon;
