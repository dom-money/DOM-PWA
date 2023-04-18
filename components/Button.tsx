import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
  /**
   * Optionally render button as an \<a\> element
   */
  asAnchor?: boolean;
  /**
   * Is button disabled?
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * URL on Click
   */
  href?: string;
  /**
   * Button type
   */
  type?: 'submit' | 'button';
}

interface ButtonElementProps {
  primary?: boolean;
};

const ButtonElement = styled.button<ButtonElementProps>`
  display: block;
  width: 100%;
  background-color:
    ${(props) => props.primary ? props.theme.colors.primary :'#1F1F1F'};
  color: ${(props) => props.primary ? '#020202' :'#FFFFFF'};
  box-shadow:
    ${(props) => props.primary ? 'none' :'0px 0px 0px 0.5px #383838 inset'};
  border: none;
  border-radius: 24px;
  padding: 2.438rem 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LinkElement = styled(ButtonElement)`
  text-align: center;
  text-decoration: none;
`;

const RenderButton = ({ label, ...props }: ButtonProps) => {
  return (
    <ButtonElement
      type='button'
      { ...props }
    >
      { label }
    </ButtonElement>
  );
};

const RenderLink = ({ href = '', label, ...props }: ButtonProps) => {
  return (
    <Link href={ href } passHref>
      <LinkElement
        as='a'
        { ...props }
      >
        { label }
      </LinkElement>
    </Link>
  );
};

const Button = ({
  primary = false,
  label,
  disabled = false,
  href = '',
  asAnchor = false,
  onClick,
  className,
  type = 'button',
}: ButtonProps) => {
  return (
    asAnchor ?
    <RenderLink
      primary={ primary }
      label={ label }
      href={ href }
      className={ className }
    /> :
    <RenderButton
      primary={ primary }
      label={ label }
      disabled={ disabled }
      onClick={ onClick }
      className={ className }
      type={ type }
    />
  );
};

export default Button;
