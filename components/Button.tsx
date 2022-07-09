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
   * Click handler
   */
  onClick?: () => void;
}

interface ButtonElementProps {
  primary?: boolean;
}

const ButtonElement = styled.button<ButtonElementProps>`
  display: block;
  width: 100%;
  background-color:
    ${(props) => props.primary ? props.theme.primaryColor :'#1F1F1F'};
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
`;

const Button = ({ primary = false, label, ...props }: ButtonProps) => {
  return (
    <ButtonElement type='button' primary={primary} {...props}>
      {label}
    </ButtonElement>
  );
};

export default Button;
