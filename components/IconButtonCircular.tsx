import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface IconButtonCircularProps {
  /**
   * Pass SVG Icon component as a child
   */
  children: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * URL on Click
   */
  href?: string;
  /**
   * Is button disabled?
   */
  disabled?: boolean;
  /**
   * Optional aria-label
   */
  ariaLabel?: string;
};

const IconButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  height: 0.875rem;
  width: 0.875rem;
  padding: 0;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    border-radius: 50%;
    cursor: pointer;
  };
  @media (hover: hover) {
    &:hover::after {
      background-color: #F8F8F8;
      opacity: 0.3;
    };
  };

  @media (hover: none) {
    &:active::after {
      background-color: #F8F8F8;
      opacity: 0.3;
    };
  };
`;

const DisabledIconButton = styled(IconButton)`
  cursor: not-allowed;
  &:after {
    content: none;
  };
`;

const IconButtonCircular = ({
  children,
  href,
  disabled,
  ariaLabel,
  ...props
}: IconButtonCircularProps) => {
  if (disabled) {
    return (
      <DisabledIconButton aria-label={ariaLabel} disabled={true}>
        {children}
      </DisabledIconButton>
    );
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <IconButton as='a' aria-label={ariaLabel} {...props}>
          {children}
        </IconButton>
      </Link>
    );
  };

  return (
    <IconButton aria-label={ariaLabel} {...props}>
      {children}
    </IconButton>
  );
};

export default IconButtonCircular;
