import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  /**
   * Title Text
   */
  text: string;
  /**
   * Prop for extending styled-components style
   */
  className?: string;
  /**
   * Optionally render title as a <label> element
   */
  as?: 'label';
  /**
   * Input ID if rendering as a <label> element
   */
  inputID?: string;
}

const TitleElement = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.063rem;
  margin-block-start: 0px;
  margin-block-end: 0px;
  text-transform: uppercase;
  color: #F8F8F8;
  opacity: 0.3;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = ({ text, className, as, inputID, ...props }: TitleProps) => {
  return (
    <TitleElement as={as} className={className} htmlFor={inputID} {...props}>
      {text}
    </TitleElement>
  );
};

export default Title;
