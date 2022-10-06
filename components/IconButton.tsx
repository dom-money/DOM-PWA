import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type sizeType = 'small' | 'medium' | 'large';

interface CommonProps {
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
   * Optional aria-label
   */
  ariaLabel?: string;
};

interface ClickHandlerProps {
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Is button disabled?
   */
  disabled?: boolean;
  asAnchor?: never;
  href?: never;
};

interface LinkProps {
  /**
   * Optionally render button as an \<a\> element
   */
  asAnchor: boolean;
  /**
   * URL on Click
   */
  href: string;
  onClick?: never;
  disabled?: never;
};

type IconButtonProps = CommonProps & (ClickHandlerProps | LinkProps);

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
  border: none;
  justify-content: center;
  align-items: center;
  ${(props) => calculateButtonSize(props.size)};
  background-color: ${(props) => props.backgroundColor};
  padding: 0;
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
`;

const DisabledButton = styled(Button)<ButtonProps>`
  opacity: 0.5;
  cursor: not-allowed;
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
  asAnchor = false,
  href = '',
  disabled = false,
  ariaLabel,
  onClick,
}: IconButtonProps) => {
  if (disabled) {
    return (
      <DisabledButton
        size={size}
        backgroundColor={backgroundColor}
        aria-label={ariaLabel}
        type='button'
        disabled={true}
      >
        {children}
        {hasNotificationBadge && <Badge />}
      </DisabledButton>
    );
  }
  if (asAnchor) {
    return (
      <Link href={href} passHref>
        <Button
          as='a'
          size={size}
          backgroundColor={backgroundColor}
          aria-label={ariaLabel}
        >
          {children}
          {hasNotificationBadge && <Badge />}
        </Button>
      </Link>
    );
  }
  return (
    <Button
      size={size}
      backgroundColor={backgroundColor}
      aria-label={ariaLabel}
      type='button'
      onClick={onClick}
    >
      {children}
      {hasNotificationBadge && <Badge />}
    </Button>
  );
};

export default IconButton;
