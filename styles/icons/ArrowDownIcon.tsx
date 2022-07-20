/* eslint-disable max-len */
import React from 'react';

interface ArrowDownIconProps {
  color: string;
  opacity: string
}

const ArrowDownIcon = ({ color, opacity }: ArrowDownIconProps) => {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity={opacity} d="M12.8087 6.50503C13.0821 6.77839 13.0821 7.22161 12.8087 7.49497C12.5353 7.76834 12.0921 7.76834 11.8187 7.49497L12.8087 6.50503ZM6.65687 1.34315L6.16189 0.848171C6.43526 0.574804 6.87847 0.574804 7.15184 0.848171L6.65687 1.34315ZM1.49499 7.49497C1.22162 7.76834 0.778405 7.76834 0.505038 7.49497C0.231671 7.22161 0.231671 6.77839 0.505038 6.50503L1.49499 7.49497ZM11.8187 7.49497L6.16189 1.83812L7.15184 0.848171L12.8087 6.50503L11.8187 7.49497ZM7.15184 1.83812L1.49499 7.49497L0.505038 6.50503L6.16189 0.848171L7.15184 1.83812Z" fill={color}/>
    </svg>
  );
};

export default ArrowDownIcon;
