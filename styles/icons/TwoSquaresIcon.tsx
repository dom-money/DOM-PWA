/* eslint-disable max-len */
import React from 'react';

interface TwoSquaresIconProps {
  color: string;
}

const TwoSquaresIcon = ({ color }: TwoSquaresIconProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10.25" y="10.9643" width="13.7857" height="13.7857" stroke={color} strokeWidth="0.5"/>
      <rect x="15.9643" y="15.25" width="13.7857" height="13.7857" stroke={color} strokeWidth="0.5"/>
    </svg>
  );
};

export default TwoSquaresIcon;
