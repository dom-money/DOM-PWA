/* eslint-disable max-len */
import React from 'react';

interface ArrowDownIconProps {
  color: string;
  opacity: string
}

const ArrowDownIcon = ({ color, opacity }: ArrowDownIconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity={ opacity } fillRule="evenodd" clipRule="evenodd" d="M0.850025 3.6766C0.576658 3.94997 0.576658 4.39318 0.850025 4.66655L6.50688 10.3234C6.78025 10.5968 7.22346 10.5968 7.49683 10.3234L13.1537 4.66655C13.427 4.39318 13.427 3.94997 13.1537 3.6766C12.8803 3.40323 12.4371 3.40323 12.1637 3.6766L7.00185 8.83848L1.83997 3.6766C1.56661 3.40323 1.12339 3.40323 0.850025 3.6766Z" fill={ color }/>
    </svg>
  );
};

export default ArrowDownIcon;
