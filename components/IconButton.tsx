import React from 'react';
import styled from 'styled-components';

type sizeType = 'small' | 'medium' | 'large';

interface IconButtonProps {
  /**
   * Icon Button Size (small: 40px, medium: 44px, large: 48px)
   */
  size: sizeType;
  /**
   * Background Color
   */
  backgroundColor: string;
  /**
   * Should a notification badge be added?
   */
  notificationBadge?: boolean;
  /**
   * Pass SVG Icon component as a child
   */
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
}

interface ButtonProps {
  size: sizeType;
  backgroundColor: string;
}

const calculateButtonSize = (size: sizeType) => {
  if (size === 'small') {
    return (`
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 4px;
    `);
  };
  if (size === 'medium') {
    return (`
    height: 2.75rem;
    width: 2.75rem;
    border-radius: 4px;
    `);
  };
  if (size === 'large') {
    return (`
    height: 3rem;
    width: 3rem;
    border-radius: 6px;
    `);
  }
};

const Button = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => calculateButtonSize(props.size)};
  background-color: ${(props) => props.backgroundColor};
  padding: 0;
  border: none;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  width: 0.375rem;
  height: 0.375rem;
  top: 8px;
  right: 10px;
  background-color: #FEF200;
  border-radius: 50%;
`;

const IconButton = ({
  size,
  backgroundColor,
  notificationBadge = false,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <Button size={size} backgroundColor={backgroundColor} {...props}>
      {children}
      {notificationBadge && <Badge />}
    </Button>
  );
};

export default IconButton;
