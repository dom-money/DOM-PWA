import React from 'react';
import Link from 'next/link';
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
  hasNotificationBadge?: boolean;
  /**
   * Pass SVG Icon component as a child
   */
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * URL on Click
   */
  href?: string
  /**
   * Is button disabled?
   */
  disabled?: boolean;
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

const Button = styled.a<ButtonProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => calculateButtonSize(props.size)};
  background-color: ${(props) => props.backgroundColor};
  padding: 0;
  flex-shrink: 0;
  cursor: pointer;
`;

const DisabledButton = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  ${(props) => calculateButtonSize(props.size)};
  background-color: ${(props) => props.backgroundColor};
  padding: 0;
  flex-shrink: 0;
  opacity: 0.5;
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
  hasNotificationBadge = false,
  children,
  href,
  disabled,
  ...props
}: IconButtonProps) => {
  if (disabled) {
    return (
      <DisabledButton
        size={size}
        backgroundColor={backgroundColor}
        disabled={true}
        {...props}
      >
        {children}
        {hasNotificationBadge && <Badge />}
      </DisabledButton>
    );
  }
  return (
    <Link href={href ? href : ''} passHref>
      <Button size={size} backgroundColor={backgroundColor} {...props}>
        {children}
        {hasNotificationBadge && <Badge />}
      </Button>
    </Link>
  );
};

export default IconButton;
