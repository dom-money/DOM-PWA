/* eslint-disable max-len */
import React from 'react';

interface ScanQRIconProps {
  color: string;
}

const ScanQRIcon = ({ color }: ScanQRIconProps) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.4 16.4138C6.4 16.7452 6.66863 17.0138 7 17.0138C7.33137 17.0138 7.6 16.7452 7.6 16.4138H6.4ZM7 7V6.4C6.66863 6.4 6.4 6.66863 6.4 7H7ZM15.9655 7.6C16.2969 7.6 16.5655 7.33137 16.5655 7C16.5655 6.66863 16.2969 6.4 15.9655 6.4V7.6ZM7.6 16.4138V7H6.4V16.4138H7.6ZM7 7.6H15.9655V6.4H7V7.6Z" fill={ color }/>
      <path d="M23.5862 6.4C23.2548 6.4 22.9862 6.66863 22.9862 7C22.9862 7.33137 23.2548 7.6 23.5862 7.6V6.4ZM33 7H33.6C33.6 6.66863 33.3314 6.4 33 6.4V7ZM32.4 16.4138C32.4 16.7452 32.6686 17.0138 33 17.0138C33.3314 17.0138 33.6 16.7452 33.6 16.4138H32.4ZM23.5862 7.6H33V6.4H23.5862V7.6ZM32.4 7V16.4138H33.6V7H32.4Z" fill={ color }/>
      <path d="M6.4 23.5862C6.4 23.2548 6.66863 22.9862 7 22.9862C7.33137 22.9862 7.6 23.2548 7.6 23.5862H6.4ZM7 33V33.6C6.66863 33.6 6.4 33.3314 6.4 33H7ZM15.9655 32.4C16.2969 32.4 16.5655 32.6686 16.5655 33C16.5655 33.3314 16.2969 33.6 15.9655 33.6V32.4ZM7.6 23.5862V33H6.4V23.5862H7.6ZM7 32.4H15.9655V33.6H7V32.4Z" fill={ color }/>
      <path d="M23.5862 33.6C23.2548 33.6 22.9862 33.3314 22.9862 33C22.9862 32.6686 23.2548 32.4 23.5862 32.4V33.6ZM33 33H33.6C33.6 33.3314 33.3314 33.6 33 33.6V33ZM32.4 23.5862C32.4 23.2548 32.6686 22.9862 33 22.9862C33.3314 22.9862 33.6 23.2548 33.6 23.5862H32.4ZM23.5862 32.4H33V33.6H23.5862V32.4ZM32.4 33V23.5862H33.6V33H32.4Z" fill={ color }/>
      <path d="M10.1379 17.6069C9.80655 17.6069 9.53792 17.8755 9.53792 18.2069C9.53792 18.5383 9.80655 18.8069 10.1379 18.8069V17.6069ZM29.8621 18.8069C30.1934 18.8069 30.4621 18.5383 30.4621 18.2069C30.4621 17.8755 30.1934 17.6069 29.8621 17.6069V18.8069ZM10.1379 18.8069H29.8621V17.6069H10.1379V18.8069Z" fill={ color }/>
      <path d="M13.1241 18.2069C13.1241 18.5383 13.3928 18.8069 13.7241 18.8069C14.0555 18.8069 14.3241 18.5383 14.3241 18.2069H13.1241ZM13.7241 13.2759V12.6759C13.3928 12.6759 13.1241 12.9445 13.1241 13.2759H13.7241ZM26.2759 13.2759H26.8759C26.8759 12.9445 26.6072 12.6759 26.2759 12.6759V13.2759ZM25.6759 18.2069C25.6759 18.5383 25.9445 18.8069 26.2759 18.8069C26.6072 18.8069 26.8759 18.5383 26.8759 18.2069H25.6759ZM14.3241 18.2069V13.2759H13.1241V18.2069H14.3241ZM13.7241 13.8759H26.2759V12.6759H13.7241V13.8759ZM25.6759 13.2759V18.2069H26.8759V13.2759H25.6759Z" fill={ color }/>
      <path d="M14.3241 21.7931C14.3241 21.4617 14.0555 21.1931 13.7241 21.1931C13.3928 21.1931 13.1241 21.4617 13.1241 21.7931H14.3241ZM13.7241 25.8276H13.1241C13.1241 26.159 13.3928 26.4276 13.7241 26.4276V25.8276ZM26.2759 25.8276V26.4276C26.6072 26.4276 26.8759 26.159 26.8759 25.8276H26.2759ZM26.8759 21.7931C26.8759 21.4617 26.6072 21.1931 26.2759 21.1931C25.9445 21.1931 25.6759 21.4617 25.6759 21.7931H26.8759ZM13.1241 21.7931V25.8276H14.3241V21.7931H13.1241ZM13.7241 26.4276H26.2759V25.2276H13.7241V26.4276ZM26.8759 25.8276V21.7931H25.6759V25.8276H26.8759Z" fill={ color }/>
    </svg>
  );
};

export default ScanQRIcon;