/* eslint-disable max-len */
import React from 'react';

interface GoBackIconProps {
  color: string;
}

const GoBackIcon = ({ color }: GoBackIconProps) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3253 13.1518C10.0519 13.4252 9.60867 13.4252 9.33531 13.1518L3.67845 7.49498C3.40508 7.22161 3.40509 6.77839 3.67845 6.50503L9.33531 0.848171C9.60867 0.574804 10.0519 0.574804 10.3253 0.848171C10.5986 1.12154 10.5986 1.56475 10.3253 1.83812L5.16338 7L10.3253 12.1619C10.5986 12.4352 10.5986 12.8785 10.3253 13.1518Z" fill={color}/>
    </svg>
  );
};

export default GoBackIcon;
